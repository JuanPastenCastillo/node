DROP DATABASE IF EXISTS learning_db;

CREATE DATABASE IF NOT EXISTS learning_db;

USE learning_db;

DROP TABLE IF EXISTS some_table, customers_orders;

CREATE TABLE some_table (
    u_id INT AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    date_birth DATE NOT NULL,
    PRIMARY KEY (u_id)
);

CREATE TABLE customers_orders (
    u_id INT AUTO_INCREMENT,
    customer_id INT NOT NULL,
    product VARCHAR(55) NOT NULL,
    price INT NOT NULL,
    FOREIGN KEY (u_id) REFERENCES some_table (u_id),
    PRIMARY KEY (u_id)
);

SELECT 'LOADING ALL!' as 'INFO';

SOURCE .\learning_db_data\load_all.sql;