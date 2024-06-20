USE learning_db;

SELECT customer_id, CONCAT('$', FORMAT(SUM(price), 0)) as total_spent
FROM customers_orders
GROUP BY
    customer_id;