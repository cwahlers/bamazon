-- Create the database seinfeld and specified it for use.
CREATE DATABASE bamazon_db;
USE bamazon_db;

-- Create the table departments.
CREATE TABLE departments (
  id int AUTO_INCREMENT,
  department_name varchar(30) NOT NULL,
  over_head_costs decimal(6,2),
  PRIMARY KEY(id)
);

-- Create the table products.
CREATE TABLE products (
  id int AUTO_INCREMENT,
  product_name varchar(30) NOT NULL,
  department_id int,
  price decimal(6,2) NOT NULL,
  stock_quantity int,
  PRIMARY KEY(id),
  FOREIGN KEY fk_department(department_id) REFERENCES departments(id)
);

-- Create the table sales.
CREATE TABLE sales (
  id int AUTO_INCREMENT,
  product_id int NOT NULL,
  quantity_purchased int NOT NULL,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(id),
  FOREIGN KEY fk_product(product_id) REFERENCES products(id)
);

-- Insert a set of records.
INSERT INTO departments (id, department_name, over_head_costs) VALUES (1, "Sports", 95.45);
INSERT INTO departments (id, department_name, over_head_costs) VALUES (2, "Mens", 35.45);
INSERT INTO departments (id, department_name, over_head_costs) VALUES (3, "Womens", 395.45);

INSERT INTO products (product_name, department_id, price, stock_quantity) VALUES ("Basketball", 1, 36.99, 5);
INSERT INTO products (product_name, department_id, price, stock_quantity) VALUES ("Baseball", 1, 6.99, 12);
INSERT INTO products (product_name, department_id, price, stock_quantity) VALUES ("Bat", 1, 145.50, 2);

INSERT INTO products (product_name, department_id, price, stock_quantity) VALUES ("Shirt", 2, 26.99, 3);
INSERT INTO products (product_name, department_id, price, stock_quantity) VALUES ("Pants", 2, 46.99, 2);
INSERT INTO products (product_name, department_id, price, stock_quantity) VALUES ("Socks", 2, 15.50, 12);

INSERT INTO products (product_name, department_id, price, stock_quantity) VALUES ("Dress", 3, 136.99, 3);
INSERT INTO products (product_name, department_id, price, stock_quantity) VALUES ("Shoes", 3, 106.99, 32);
INSERT INTO products (product_name, department_id, price, stock_quantity) VALUES ("Hand Bag", 3, 95.50, 4);


