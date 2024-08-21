import mysql from "mysql2/promise"

/* 

# .env file
DB_HOST=localhost
DB_USER=root
DB_PASS=my_secure_password
DB_NAME=database_name

require('dotenv').DEFAULT_CONFIG();
const DEFAULT_CONFIG = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};

!FH99
It looks like I have to know how to authenticate user first in order to have some permission on the database. To be able to use something like this:
«
CREATE USER 'read_user'@'%' IDENTIFIED BY 'read_user_password';
GRANT SELECT ON moviesdb.* TO 'read_user'@'%';
CREATE USER 'read_post_user'@'%' IDENTIFIED BY 'read_post_user_password';
GRANT SELECT, INSERT, DELETE ON moviesdb.* TO 'read_post_user'@'%';
CREATE USER 'admin_user'@'%' IDENTIFIED BY 'admin_user_password';
GRANT SELECT, INSERT, DELETE, UPDATE ON moviesdb.* TO 'admin_user'@'%';
FLUSH PRIVILEGES;
»
*/

const DEFAULT_CONFIG = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: 3306,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
}

export const mysql_connection = async () => {
  let connection
  try {
    connection = await mysql.createConnection(DEFAULT_CONFIG)
    console.log("Database connection established successfully.")
  } catch (error) {
    console.error("Error connecting to the database:", error.message)
    throw error
  }

  return { connection }
}
