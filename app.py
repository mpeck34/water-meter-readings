from flask import Flask, request, jsonify
from sqlalchemy import create_engine, Column, Integer, String, Boolean, MetaData, Table
from sqlalchemy.orm import declarative_base, sessionmaker

app = Flask(__name__)

# Set up SQLAlchemy
engine = create_engine('sqlite:///your_database.db')  # Ensure this matches your database path
Base = declarative_base()
Session = sessionmaker(bind=engine)
session = Session()

# Define your table models
class Queue(Base):
    __tablename__ = 'queue'
    id = Column(Integer, primary_key=True)
    data = Column(String)
    processed = Column(Boolean, default=False)

Base.metadata.create_all(engine)

# Queue when destination is unavailable
def queue_data(data):
    new_entry = Queue(data=data)
    session.add(new_entry)
    session.commit()

# Check if destination is available
def is_destination_available():
    # Example logic
    return True

def process_queue():
    if is_destination_available():
        queued_items = session.query(Queue).filter_by(processed=False).all()
        for item in queued_items:
            # Logic to send data to the destination
            print(f"Processing: {item.data}")
            item.processed = True
        session.commit()

def fetch_route_data(route_id):
    with engine.connect() as connection:
        # Fetch route details
        route_query = connection.execute("SELECT * FROM route WHERE route_id = ?", (route_id,))
        route_data = route_query.fetchone()
        
        if route_data is None:
            return {"error": "Route not found"}, 404
        
        # Fetch meters associated with the route
        meters_query = connection.execute("SELECT * FROM meter_readings WHERE route_id = ?", (route_id,))
        meters_data = meters_query.fetchall()
        
        # Format the results
        response = {
            "route": {
                "route_id": route_data['route_id'],
                "route_name": route_data['route_name'],
                "assigned_worker": route_data['assigned_worker'],
                "date_assigned": route_data['date_assigned'],
                "area_covered": route_data['area_covered']
            },
            "meters": [
                {
                    "meter_id": meter['meter_id'],
                    "read_value": meter['read_value'],
                    "read_status": meter['read_status'],
                    "sync_status": meter['sync_status'],
                    "last_sync": meter['last_sync']
                }
                for meter in meters_data
            ]
        }
        
    return response

@app.route('/')
def home():
    return "Flask is running!"    

@app.route('/get_route_data/<route_id>', methods=['GET'])
def get_route_data(route_id):
    data = fetch_route_data(route_id)  # Implement this function
    return jsonify(data)

@app.route('/sync_data', methods=['POST'])
def sync_data():
    data = request.json
    readings = data.get('readings', [])
    
    for reading in readings:
        meter_id = reading.get('meter_id')
        read_value = reading.get('read_value')
        read_status = reading.get('read_status')
        
        # Update the database with the new data
        # Example query (adjust according to your schema)
        with engine.connect() as connection:
            connection.execute(
                "UPDATE meter_readings SET read_value = ?, read_status = ? WHERE meter_id = ?",
                (read_value, read_status, meter_id)
            )
    
    return jsonify({'status': 'success'})

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)
