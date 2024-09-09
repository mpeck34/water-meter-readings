from flask import Flask, request, jsonify
from sqlalchemy import create_engine, Column, Integer, String, Boolean, MetaData, Table
from sqlalchemy.orm import declarative_base, sessionmaker
from sqlalchemy.exc import SQLAlchemyError

app = Flask(__name__)

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
            SELECT r.route_id, r.route_message
            FROM routes r
            WHERE r.route_id = :route_id
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
                "route_id": route_data['route_id'],
                "route_message": route_data['route_message'],
                "route_name": route_data.get('route_name', 'N/A'),
                "date_assigned": route_data.get('assigned_datetime', 'N/A')
            },
            "meters": [
                {
                    "meter_id": meter['meter_id'],
                    "address": meter['address'],
                    "expected_range": meter['expected_range'],
                    "read_value": meter['read_value'],
                    "read_status": meter['read_status'],
                    "sync_status": meter['sync_status'],
                    "last_sync": meter['last_sync'],
                    "skip_status": meter.get('skip_status', 'N/A'),
                    "skip_reason": meter.get('skip_reason', 'N/A'),
                    "special_message": meter.get('special_message', 'N/A')
                }
                for meter in meters_data
            ]
        }
        
    return response

@app.route('/')
def home():
    with engine.connect() as connection:
        # Fetch route IDs from the database
        result = connection.execute(text('SELECT route_id FROM routes'))
        routes = result.fetchall()
    
    # Create HTML content with the route IDs
    route_list = ''.join([f"<li>{route['route_id']}</li>" for route in routes])
    
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
    
    with engine.connect() as connection:
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

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)
