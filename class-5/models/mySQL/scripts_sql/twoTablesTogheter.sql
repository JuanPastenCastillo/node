USE learning_db;

SELECT st.first_name, st.last_name, co.product, CONCAT('$', FORMAT(co.price, 0)) AS Price
FROM
    some_table st
    JOIN customers_orders co ON st.u_id = co.u_id