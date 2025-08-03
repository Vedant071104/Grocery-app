from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import product_dao
import os

app = Flask(__name__, static_folder='UI')  # Serve static files from the UI folder
CORS(app)

# After request to add CORS headers
@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    return response

# Endpoint to add product
@app.route('/add-product', methods=['POST'])
def add_product():
    data = request.get_json()
    product_name = data['name']
    product_price = data['price']
    product_uom = data['uom']
    
    product_dao.add_product(product_name, product_price, product_uom)
    return jsonify({"message": "Product added successfully!"})

# Endpoint to delete product by ID
@app.route('/delete-product/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    result = product_dao.delete_product(product_id)
    if result:
        return jsonify({"message": "Product deleted successfully!"})
    else:
        return jsonify({"error": "Product not found"}), 404

# Endpoint to update product by ID
@app.route('/update-product/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    data = request.get_json()
    product_name = data['name']
    product_price = data['price']
    product_uom = data['uom']
    
    result = product_dao.update_product(product_id, product_name, product_price, product_uom)
    if result:
        return jsonify({"message": "Product updated successfully!"})
    else:
        return jsonify({"error": "Update failed"}), 500

# Endpoint to get all products
@app.route('/get-products', methods=['GET'])
def get_products():
    connection = product_dao.get_connection()
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM products")
    products = cursor.fetchall()
    cursor.close()
    connection.close()

    if not products:
        return jsonify({"error": "No products found"}), 404

    product_list = [{"id": product[0], "name": product[1], "price": product[2], "uom": product[3]} for product in products]
    return jsonify(product_list)

# Serve index.html when accessing the root URL
@app.route('/')
def serve_index():
    return send_from_directory(os.path.join(app.static_folder), 'index.html')

# Serve static files (CSS, JS, images) from the UI folder
@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory(os.path.join(app.static_folder), filename)

if __name__ == '__main__':
    app.run(debug=True)