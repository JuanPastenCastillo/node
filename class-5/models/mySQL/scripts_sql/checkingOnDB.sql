use moviesdb;

# Check data on database

-- SELECT BIN_TO_UUID(m.id) as theId, m.* FROM movie m ORDER BY m.title;

SELECT BIN_TO_UUID(m.id) as UUID_, m.*, GROUP_CONCAT(g.name SEPARATOR ', ') AS genres
FROM
    movie m
    JOIN movies_genres mg ON m.id = mg.movie_id
    JOIN genre g ON mg.genre_id = g.id
GROUP BY
    m.id
ORDER BY m.title;

/*
SELECT BIN_TO_UUID(mg.movie_id) as theIdOfTheMovie, mg.*
FROM movies_genres mg;
*/

/*
SELECT BIN_TO_UUID(mg.movie_id) as theIdOfTheMovie, mg.genre_id
from movies_genres mg
ORDER BY theIdOfTheMovie;
*/

/*
SELECT m.title, BIN_TO_UUID(m.id) as UUID_, GROUP_CONCAT(g.name SEPARATOR ', ') AS genres
FROM
movie m
JOIN movies_genres mg ON m.id = mg.movie_id
JOIN genre g ON mg.genre_id = g.id
GROUP BY
m.id
ORDER BY m.title;
*/

/* Visualize */

-- SHOW TABLES;
-- SHOW TRIGGERS;

-- SHOW TABLE movies_genres;
-- SHOW CREATE TABLE movie;

-- DESCRIBE movies_genres;
-- SHOW COLUMNS FROM genre;
-- select * from genre;
-- SHOW TABLES;

# Permissions

/*
CREATE USER 'read_user'@'%' IDENTIFIED BY 'read_user_password';
GRANT SELECT ON moviesdb.* TO 'read_user'@'%';
CREATE USER 'read_post_user'@'%' IDENTIFIED BY 'read_post_user_password';
GRANT SELECT, INSERT, DELETE ON moviesdb.* TO 'read_post_user'@'%';
CREATE USER 'admin_user'@'%' IDENTIFIED BY 'admin_user_password';
GRANT SELECT, INSERT, DELETE, UPDATE ON moviesdb.* TO 'admin_user'@'%';
FLUSH PRIVILEGES;
*/

/*
SHOW GRANTS FOR 'read_user'@'%';
SHOW GRANTS FOR 'read_post_user'@'%';
SHOW GRANTS FOR 'admin_user'@'%';
*/
/*
DROP USER 'read_user'@'%';
DROP USER 'read_post_user'@'%';
DROP USER 'admin_user'@'%';
*/