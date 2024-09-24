import sqlite3

# Connect to the SQLite database
sqlite_conn = sqlite3.connect('meter_reading.db')
with open('sqlite_dump.sql', 'w') as f:
    for line in sqlite_conn.iterdump():
        f.write('%s\n' % line)

sqlite_conn.close()