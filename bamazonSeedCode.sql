USE bamazon;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("sewing machine", "machines", 399.99, 8), ("scissors", "tools", 15.99, 25),
("iron", "tools", 39.95, 15), ("pins - 100count", "notions", 5.99, 50),
("measuring tape", "notions", 1.95, 35), ("serger", "machines", 550.99, 10),
("cotton fabric - 5yd bundle", "supplies", 24.99, 20), ("silk fabric - 3yd bundle", "supplies", 59.95, 15),
("polyester thread", "supplies", 5.99, 75), ("zipper", "supplies", 3.89, 36);

INSERT INTO departments (department_name, over_head_costs)
VALUE ("machines", 530.00), ("tools", 257.00), ("notions", 75.00), ("supplies", 325.00);