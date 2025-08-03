CREATE DATABASE grocery_db;
USE grocery_db;

CREATE TABLE uom (
    uom_id INT AUTO_INCREMENT PRIMARY KEY,
    uom_name VARCHAR(50)
);

CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    uom_id INT,
    price DECIMAL(10,2),
    FOREIGN KEY (uom_id) REFERENCES uom(uom_id)
);

-- Optional dummy data
INSERT INTO uom (uom_name) VALUES ('Kg'), ('Litre'), ('Piece');
INSERT INTO products (name, uom_id, price) VALUES ('Apple', 1, 50), ('Milk', 2, 40), ('Toothpaste', 3, 30);
