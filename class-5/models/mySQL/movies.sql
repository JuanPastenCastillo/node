/* creation of database */
DROP DATABASE IF EXISTS moviesdb;

CREATE DATABASE IF NOT EXISTS moviesdb;

/* use */
USE moviesdb;

/* 
On Databases, the best way to understand them is with the Microsoft Excel files
The tables will be every page on Excel
*/

/* create the table movies */
CREATE TABLE movie (
    id BINARY(16) PRIMARY KEY DEFAULT(UUID_TO_BIN(UUID())),
    title VARCHAR(255) NOT NULL,
    year INT UNSIGNED NOT NULL,
    director VARCHAR(255) NOT NULL,
    duration INT NOT NULL,
    /*
    Usually TEXT use more memory space than VARCHAR. On VARCHAR with the number between parhentesis, you explicity limit the 
    amount of characters for that field
    */
    poster TEXT NOT NULL,
    rate DECIMAL(2, 1) UNSIGNED NOT NULL,
    oscar BOOLEAN NOT NULL,
    basedOnBook BOOLEAN NOT NULL
);

CREATE TABLE genre (
    id INT AUTO_INCREMENT PRIMARY KEY,
    /*
    Some field can be UNIQUE but not be the principal key
    And more: a name user neither an email can be never a PRIMARY KEY because it can be changed. Tomorrow the name or the email could change
    The PRIMARY KEY should be unique and immutable
    */
    name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE movies_genres (
    movie_id BINARY(16) REFERENCES movie (id),
    genre_id INT REFERENCES genre (id),
    PRIMARY KEY (movie_id, genre_id)
);

INSERT INTO
    genre (name)
VALUES ("Action"),
    ("Adventure"),
    ("Animation"),
    ("Biography"),
    ("Crime"),
    ("Drama"),
    ("Fantasy"),
    ("Romance"),
    ("Sci-Fi");

INSERT INTO
    movie (
        id,
        title,
        year,
        director,
        duration,
        poster,
        rate,
        oscar,
        basedOnBook
    )
VALUES (
        UUID_TO_BIN(UUID()),
        "The Dark Knight",
        2008,
        "Christopher Nolan",
        152,
        "https://i.ebayimg.com/images/g/yokAAOSw8w1YARbm/s-l1200.jpg",
        9.0,
        false,
        false
    ),
    (
        UUID_TO_BIN(UUID()),
        "The Shawshank Redemption",
        1994,
        "Frank Darabont",
        142,
        "https://i.ebayimg.com/images/g/4goAAOSwMyBe7hnQ/s-l1200.webp",
        9.9,
        false,
        true
    ),
    (
        UUID_TO_BIN(UUID()),
        "Inception",
        2010,
        "Christopher Nolan",
        148,
        "https://m.media-amazon.com/images/I/91Rc8cAmnAL._AC_UF1000,1000_QL80_.jpg",
        8.8,
        true,
        false
    ),
    (
        UUID_TO_BIN(UUID()),
        "Pulp Fiction",
        1994,
        "Quentin Tarantino",
        175,
        "https://www.themoviedb.org/t/p/original/vQWk5YBFWF4bZaofAbv0tShwBvQ.jpg",
        9.2,
        true,
        true
    );

INSERT INTO
    movies_genres (movie_id, genre_id)
VALUES (
        (
            SELECT id
            FROM movie
            WHERE
                title = "The Dark Knight"
        ),
        (
            SELECT id
            FROM genre
            WHERE
                name = "Sci-Fi"
        )
    ),
    (
        (
            SELECT id
            FROM movie
            WHERE
                title = "The Dark Knight"
        ),
        (
            SELECT id
            FROM genre
            WHERE
                name = "Action"
        )
    ),
    (
        (
            SELECT id
            FROM movie
            WHERE
                title = "The Shawshank Redemption"
        ),
        (
            SELECT id
            FROM genre
            WHERE
                name = "Drama"
        )
    ),
    (
        (
            SELECT id
            FROM movie
            WHERE
                title = "Inception"
        ),
        (
            SELECT id
            FROM genre
            WHERE
                name = "Sci-Fi"
        )
    ),
    (
        (
            SELECT id
            FROM movie
            WHERE
                title = "Pulp Fiction"
        ),
        (
            SELECT id
            FROM genre
            WHERE
                name = "Drama"
        )
    );

-- SELECT * FROM movie;

SELECT
    BIN_TO_UUID(id),
    title,
    year,
    director,
    duration,
    poster,
    rate,
    oscar,
    basedOnBook
FROM movie;