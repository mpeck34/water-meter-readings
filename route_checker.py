import sqlite3

def check_routes():
    conn = sqlite3.connect('your_database.db')
    cursor = conn.cursor()
    cursor.execute('SELECT route_id FROM routes')
    routes = cursor.fetchall()
    conn.close()
    
    for route in routes:
        print(route)

if __name__ == "__main__":
    check_routes()