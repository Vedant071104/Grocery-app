import mysql.connector

def get_connection():
    # Establish a connection to the local MySQL database
    conn = mysql.connector.connect(
        host='localhost',  # Use localhost for local MySQL server
        user='root',  # Replace with your MySQL username
        password='ved@071104',  # Replace with your MySQL password
        database='grocery_db'  # Replace with your database name
    )
    return conn
