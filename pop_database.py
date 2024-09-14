import sqlite3
from datetime import datetime

def populate_database():
    # Connect to SQLite database
    conn = sqlite3.connect('meter_reading.db')
    cursor = conn.cursor()

    # Enable foreign key support
    cursor.execute('PRAGMA foreign_keys = ON')

    # Clear tables (in reverse order to handle foreign key constraints)
    cursor.execute('DELETE FROM current_route_assignment')
    cursor.execute('DELETE FROM special_message')
    cursor.execute('DELETE FROM skip_status')
    cursor.execute('DELETE FROM meter_readings')
    cursor.execute('DELETE FROM expected_range')
    cursor.execute('DELETE FROM master_index')
    cursor.execute('DELETE FROM routes')

    # Insert route data
    route_id = 123
    route_message = 'Initial Route Data'
    cursor.execute('''
        INSERT INTO routes (route_id, route_message)
        VALUES (?, ?)
    ''', (route_id, route_message))

    # Insert master_index data for 50 meters
    for i in range(1, 51):
        meter_id = f'YAF{i:04}'
        address = f'{i} Smith St Kingsbury'
        cursor.execute('''
            INSERT INTO master_index (index_position, meter_id, address, route_id)
            VALUES (?, ?, ?, ?)
        ''', (i, meter_id, address, route_id))

        # Insert meter_readings with dummy values
        cursor.execute('''
            INSERT INTO meter_readings (meter_id, route_id, read_value, read_status, sync_status, last_sync)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (meter_id, route_id, 0, 'N/A', 'Pending', datetime.now()))

        # Insert skip_status with dummy values
        cursor.execute('''
            INSERT INTO skip_status (meter_id, skip_status, skip_reason)
            VALUES (?, ?, ?)
        ''', (meter_id, 'Nominal', 'N/A'))

        # Insert current_route_assignment with dummy values
        cursor.execute('''
            INSERT INTO current_route_assignment (meter_id, route_id, assigned_datetime, completed_datetime, reader_id)
            VALUES (?, ?, ?, ?, ?)
        ''', (meter_id, route_id, datetime.now(), None, None))

        # Insert special_message with dummy values
        cursor.execute('''
            INSERT INTO special_message (meter_id, message)
            VALUES (?, ?)
        ''', (meter_id, 'N/A'))

        # Insert expected_range with dummy values
        cursor.execute('''
            INSERT INTO expected_range (meter_id, range)
            VALUES (?, ?)
        ''', (meter_id, 100))

    # Commit changes and close the connection
    conn.commit()
    conn.close()

if __name__ == "__main__":
    populate_database()
