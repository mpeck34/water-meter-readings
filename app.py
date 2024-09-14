from flask import Flask, request, jsonify
from sqlalchemy import create_engine, Column, Integer, String, Boolean, MetaData, Table
from sqlalchemy.orm import declarative_base, sessionmaker
from sqlalchemy.exc import SQLAlchemyError
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

# Set up SQLAlchemy
DATABASE_URL = "sqlite:///meter_reading.db"
engine = create_engine(DATABASE_URL)
Base = declarative_base()
Session = sessionmaker(bind=engine)

# Define your table models
class Queue(Base):
    __tablename__ = 'queue'
    id = Column(Integer, primary_key=True)
    data = Column(String)
    processed = Column(Boolean, default=False)

Base.metadata.create_all(engine)

# Queue when destination is unavailable
def queue_data(data):
    session = Session()
    try:
        new_entry = Queue(data=data)
        session.add(new_entry)
        session.commit()
    except SQLAlchemyError as e:
        session.rollback()
        print(f"Error adding to queue: {e}")
    finally:
        session.close()

# Check if destination is available
def is_destination_available():
    # Example logic
    return True

def process_queue():
    if is_destination_available():
        session = Session()
        try:
            queued_items = session.query(Queue).filter_by(processed=False).all()
            for item in queued_items:
                # Logic to send data to the destination
                print(f"Processing: {item.data}")
                item.processed = True
            session.commit()
        except SQLAlchemyError as e:
            session.rollback()
            print(f"Error processing queue: {e}")
        finally:
            session.close()

from sqlalchemy import text

def fetch_route_data(route_id):
    with engine.connect() as connection:
        # Fetch route details
        route_query = connection.execute(text('''
            SELECT route_id, route_message
            FROM routes
            WHERE route_id = :route_id
        '''), {"route_id": route_id})
        route_data = route_query.fetchone()
        
        if route_data is None:
            return {"error": "Route not found"}, 404
        
        # Fetch meters associated with the route
        meters_query = connection.execute(text('''
            SELECT mr.meter_id, mi.address, er.range AS expected_range, 
                   mr.read_value, mr.read_status, mr.sync_status, mr.last_sync,
                   ss.skip_status, ss.skip_reason, sm.message AS special_message
            FROM meter_readings mr
            JOIN master_index mi ON mr.meter_id = mi.meter_id
            LEFT JOIN expected_range er ON mr.meter_id = er.meter_id
            LEFT JOIN skip_status ss ON mr.meter_id = ss.meter_id
            LEFT JOIN special_message sm ON mr.meter_id = sm.meter_id
            WHERE mr.route_id = :route_id
        '''), {"route_id": route_id})
        meters_data = meters_query.fetchall()
        
        # Format the results
        response = {
            "route": {
                "route_id": route_data[0],  # Access via index for tuple
                "route_message": route_data[1]
            },
            "meters": [
                {
                    "meter_id": meter[0],
                    "address": meter[1],
                    "expected_range": meter[2],
                    "read_value": meter[3],
                    "read_status": meter[4],
                    "sync_status": meter[5],
                    "last_sync": meter[6],
                    "skip_status": meter[7] if meter[7] is not None else 'N/A',
                    "skip_reason": meter[8] if meter[8] is not None else 'N/A',
                    "special_message": meter[9] if meter[9] is not None else 'N/A'
                }
                for meter in meters_data
            ]
        }
        
    return response


@app.route('/')
def home():
    with engine.connect() as connection:
        result = connection.execute(text('SELECT route_id FROM routes'))
        routes = result.fetchall()
    
    # Create HTML content with the route IDs
    route_list = ''.join([f"<li>{row[0]}</li>" for row in routes])  # Access via index for tuple
    
    return f"""
    <p>Flask is running!</p>
    <p>Available routes:</p>
    <ul>
        {route_list}
    </ul>
    <p>To get route details, use /get_route_data/&lt;route_id&gt;</p>
    """

@app.route('/get_route_data/<int:route_id>', methods=['GET'])
def get_route_data(route_id):
    data = fetch_route_data(route_id)
    return jsonify(data)

@app.route('/sync_data', methods=['POST'])
def sync_data():
    data = request.json
    readings = data.get('readings', [])
    
    with engine.begin() as connection:
        for reading in readings:
            meter_id = reading.get('meter_id')
            read_value = reading.get('read_value')
            read_status = reading.get('read_status')
            sync_status = reading.get('sync_status')
            last_sync = reading.get('last_sync')
            skip_status = reading.get('skip_status')
            skip_reason = reading.get('skip_reason')
            special_message = reading.get('special_message')

            # Update the database with the new data
            connection.execute(
                '''
                UPDATE meter_readings
                SET read_value = :read_value, read_status = :read_status, sync_status = :sync_status, last_sync = :last_sync
                WHERE meter_id = :meter_id
                ''',
                {'read_value': read_value, 'read_status': read_status, 'sync_status': sync_status, 'last_sync': last_sync, 'meter_id': meter_id}
            )

            # Update skip_status and skip_reason if they exist
            if skip_status is not None:
                connection.execute(
                    '''
                    INSERT OR REPLACE INTO skip_status (meter_id, skip_status, skip_reason)
                    VALUES (:meter_id, :skip_status, :skip_reason)
                    ''',
                    {'meter_id': meter_id, 'skip_status': skip_status, 'skip_reason': skip_reason}
                )

            # Update special_message if it exists
            if special_message is not None:
                connection.execute(
                    '''
                    INSERT OR REPLACE INTO special_message (meter_id, message)
                    VALUES (:meter_id, :message)
                    ''',
                    {'meter_id': meter_id, 'message': special_message}
                )
    
    return jsonify({'status': 'success'})

## Server API to display data
@app.route('/get_data', methods=['GET'])
def get_data():
    with engine.connect() as connection:
        meter_readings = connection.execute('SELECT * FROM meter_readings').fetchall()
        skip_status = connection.execute('SELECT * FROM skip_status').fetchall()
        special_messages = connection.execute('SELECT * FROM special_message').fetchall()
        
        return jsonify({
            'meter_readings': [dict(row) for row in meter_readings],
            'skip_status': [dict(row) for row in skip_status],
            'special_messages': [dict(row) for row in special_messages]
        })


if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)
