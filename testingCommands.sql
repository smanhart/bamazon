USE bamazon;

SELECT * FROM products;

SELECT stock_quantity - 3 FROM products WHERE item_id = 2;

UPDATE products SET stock_quantity = stock_quantity - 3 WHERE item_id = 2;

SELECT item_id, product_name, stock_quantity FROM products WHERE stock_quantity < 5;

SELECT * FROM products;

SELECT * FROM departments;

SELECT department_id, departments.department_name, over_head_costs, product_sales, product_sales - over_head_costs AS total_profit
FROM departments LEFT JOIN products ON departments.department_name = products.department_name
ORDER BY department_name;

