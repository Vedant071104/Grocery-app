import mysql.connector

# Connect to MySQL database
def get_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="ved@071104",
        database="grocery_db"
    )

def add_product(name, price, uom):
    connection = get_connection()
    cursor = connection.cursor()
    cursor.execute("INSERT INTO products (name, price, uom) VALUES (%s, %s, %s)", (name, price, uom))
    connection.commit()
    cursor.close()
    connection.close()

def delete_product(product_id):
    connection = get_connection()
    cursor = connection.cursor()
    cursor.execute("DELETE FROM products WHERE id = %s", (product_id,))
    connection.commit()
    affected_rows = cursor.rowcount
    cursor.close()
    connection.close()
    return affected_rows > 0

# ✅ Function to update product
def update_product(product_id, name, price, uom):
    connection = get_connection()
    cursor = connection.cursor()
    cursor.execute(
        "UPDATE products SET name = %s, price = %s, uom = %s WHERE id = %s",
        (name, price, uom, product_id)
    )
    connection.commit()
    affected_rows = cursor.rowcount
    cursor.close()
    connection.close()
    return affected_rows > 0
