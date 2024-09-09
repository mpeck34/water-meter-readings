import sqlite3

def create_database():
    # Connect to SQLite database (or create it if it doesn't exist)
    conn = sqlite3.connect('meter_reading.db')
    cursor = conn.cursor()

    # Enable foreign key support
    cursor.execute('PRAGMA foreign_keys = ON')

    # Create tables
    cursor.executescript('''
        CREATE TABLE IF NOT EXISTS routes (
            route_id INTEGER PRIMARY KEY,
            route_message TEXT
        );
                         
        CREATE TABLE IF NOT EXISTS master_index (
            index_position INTEGER PRIMARY KEY,
            meter_id TEXT UNIQUE NOT NULL,
            address TEXT NOT NULL,
            route_id INTEGER,
            FOREIGN KEY (route_id) REFERENCES routes (route_id)
        );
        
        CREATE TABLE IF NOT EXISTS meter_readings (
            meter_id TEXT PRIMARY KEY,
            route_id INTEGER,
            read_value INTEGER,
            read_status TEXT,
            sync_status TEXT,
            last_sync TIMESTAMP,
            FOREIGN KEY (meter_id) REFERENCES master_index (meter_id),
            FOREIGN KEY (route_id) REFERENCES routes (route_id)
        );
        
        CREATE TABLE IF NOT EXISTS skip_status (
            meter_id TEXT PRIMARY KEY,
            skip_status TEXT,
            skip_reason TEXT,
            FOREIGN KEY (meter_id) REFERENCES master_index (meter_id)
        );
        
        CREATE TABLE IF NOT EXISTS current_route_assignment (
            meter_id TEXT PRIMARY KEY,
            route_id INTEGER,
            assigned_datetime TIMESTAMP,
            completed_datetime TIMESTAMP,
            reader_id INTEGER,
            FOREIGN KEY (meter_id) REFERENCES master_index (meter_id),
            FOREIGN KEY (route_id) REFERENCES routes (route_id)
        );
        
        CREATE TABLE IF NOT EXISTS special_message (
            meter_id TEXT PRIMARY KEY,
            message TEXT,
            FOREIGN KEY (meter_id) REFERENCES master_index (meter_id)
        );
        
        CREATE TABLE IF NOT EXISTS expected_range (
            meter_id TEXT PRIMARY KEY,
            range INTEGER,
            FOREIGN KEY (meter_id) REFERENCES master_index (meter_id)
        );
    ''')

    # Commit changes and close the connection
    conn.commit()
    conn.close()

if __name__ == "__main__":
    create_database()
