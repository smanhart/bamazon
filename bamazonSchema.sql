DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INTEGER NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(200) NOT NULL,
    department_name VARCHAR(200) NOT NULL,
    price DECIMAL(6,2) NOT NULL,
    stock_quantity INTEGER NOT NULL,
    PRIMARY KEY (item_id)
);

CREATE TABLE departments (
	department_id INTEGER NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(200) NOT NULL,
    over_head_costs DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (department_id)
);

ALTER TABLE products 
ADD COLUMN product_sales DECIMAL(10,2);
