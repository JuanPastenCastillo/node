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
    title VARCHAR(255) NOT NULL UNIQUE,
    year INT UNSIGNED NOT NULL,
    director VARCHAR(255) NOT NULL,
    duration INT NOT NULL,
    /*
    Usually TEXT use more memory space than VARCHAR. On VARCHAR with the number between parhentesis, you explicity limit the 
    amount of characters for that field
    */
    poster TEXT NOT NULL,
    rate DECIMAL(2, 1) UNSIGNED DEFAULT(NULL),
    oscar BOOLEAN DEFAULT(NULL),
    basedOnBook BOOLEAN DEFAULT(NULL)
);

DELIMITER $$

CREATE TRIGGER lower_case_title_and_director_before_insert
BEFORE INSERT ON movie
FOR EACH ROW
BEGIN
   SET NEW.title = LOWER(NEW.title);
   SET NEW.director = LOWER(NEW.director);
END$$

DELIMITER;

DELIMITER $$

CREATE TRIGGER delete_moviesGenre_when_movie_is_deleted
AFTER DELETE ON movie
FOR EACH ROW
BEGIN 
  DELETE FROM movies_genres 
  WHERE movie_id = OLD.id;
END$$

DELIMITER;

CREATE INDEX id_movie_index ON movie (id);

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
VALUES ("action"),
    ("adventure"),
    ("animation"),
    ("biography"),
    ("crime"),
    ("drama"),
    ("fantasy"),
    ("romance"),
    ("sci-fi");

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
        "the shawshank redemption",
        1994,
        "frank darabont",
        142,
        "https://i.ebayimg.com/images/g/4goAAOSwMyBe7hnQ/s-l1200.webp",
        9.9,
        false,
        true
    ),
    (
        UUID_TO_BIN(UUID()),
        "the dark knight",
        2008,
        "christopher nolan",
        152,
        "https://i.ebayimg.com/images/g/yokAAOSw8w1YARbm/s-l1200.jpg",
        9.0,
        false,
        false
    ),
    (
        UUID_TO_BIN(UUID()),
        "inception",
        2010,
        "christopher nolan",
        148,
        "https://m.media-amazon.com/images/I/91Rc8cAmnAL._AC_UF1000,1000_QL80_.jpg",
        8.8,
        false,
        false
    ),
    (
        UUID_TO_BIN(UUID()),
        "pulp fiction",
        1994,
        "quentin tarantino",
        154,
        "https://www.themoviedb.org/t/p/original/vQWk5YBFWF4bZaofAbv0tShwBvQ.jpg",
        8.9,
        false,
        false
    ),
    (
        UUID_TO_BIN(UUID()),
        "forrest gump",
        1994,
        "robert zemeckis",
        142,
        "https://i.ebayimg.com/images/g/qR8AAOSwkvRZzuMD/s-l1600.jpg",
        8.8,
        false,
        false
    ),
    (
        UUID_TO_BIN(UUID()),
        "gladiator",
        2000,
        "ridley scott",
        155,
        "https://img.fruugo.com/product/0/60/14417600_max.jpg",
        8.5,
        false,
        false
    ),
    (
        UUID_TO_BIN(UUID()),
        "the matrix",
        1999,
        "lana wachowski",
        136,
        "https://i.ebayimg.com/images/g/QFQAAOSwAQpfjaA6/s-l1200.jpg",
        8.7,
        false,
        false
    ),
    (
        UUID_TO_BIN(UUID()),
        "interstellar",
        2014,
        "christopher nolan",
        169,
        "https://m.media-amazon.com/images/I/91obuWzA3XL._AC_UF1000,1000_QL80_.jpg",
        8.6,
        false,
        false
    ),
    (
        UUID_TO_BIN(UUID()),
        "the lord of the rings: the return of the king",
        2003,
        "peter jackson",
        201,
        "https://i.ebayimg.com/images/g/0hoAAOSwe7peaMLW/s-l1600.jpg",
        8.9,
        false,
        false
    ),
    (
        UUID_TO_BIN(UUID()),
        "the lion king",
        1994,
        "roger allers, rob minkoff",
        88,
        "https://m.media-amazon.com/images/I/81BMmrwSFOL._AC_UF1000,1000_QL80_.jpg",
        8.5,
        true,
        false
    ),
    (
        UUID_TO_BIN(UUID()),
        "the avengers",
        2012,
        "joss whedon",
        143,
        "https://img.fruugo.com/product/7/41/14532417_max.jpg",
        8.7,
        true,
        false
    ),
    (
        UUID_TO_BIN(UUID()),
        "jurassic park",
        1993,
        "steven spielberg",
        127,
        "https://vice-press.com/cdn/shop/products/Jurassic-Park-Editions-poster-florey.jpg?v=1654518755&width=1024",
        8.1,
        false,
        false
    ),
    (
        UUID_TO_BIN(UUID()),
        "titanic",
        1997,
        "james cameron",
        195,
        "https://i.pinimg.com/originals/42/42/65/4242658e6f1b0d6322a4a93e0383108b.png",
        7.8,
        false,
        false
    ),
    (
        UUID_TO_BIN(UUID()),
        "the social network",
        2010,
        "david fincher",
        120,
        "https://i.pinimg.com/originals/7e/37/b9/7e37b994b613e94cba64f307b1983e39.jpg",
        7.7,
        false,
        false
    ),
    (
        UUID_TO_BIN(UUID()),
        "avatar",
        2009,
        "james cameron",
        162,
        "https://i.etsystatic.com/35681979/r/il/dfe3ba/3957859451/il_fullxfull.3957859451_h27r.jpg",
        7.8,
        true,
        true
    ),
    (
        UUID_TO_BIN(UUID()),
        "avatar 1",
        2019,
        "james cameron",
        162,
        "https://i.etsystatic.com/35681979/r/il/dfe3ba/3957859451/il_fullxfull.3957859451_h27r.jpg",
        9.5,
        true,
        false
    ),
    (
        UUID_TO_BIN(UUID()),
        "avatar 2",
        2025,
        "james cameron",
        162,
        "https://i.etsystatic.com/35681979/r/il/dfe3ba/3957859451/il_fullxfull.3957859451_h27r.jpg",
        7.8,
        true,
        true
    ),
    (
        UUID_TO_BIN(UUID()),
        "avatar 3",
        2025,
        "james cameron",
        162,
        "https://i.etsystatic.com/35681979/r/il/dfe3ba/3957859451/il_fullxfull.3957859451_h27r.jpg",
        9.5,
        true,
        true
    ),
    (
        UUID_TO_BIN(UUID()),
        "avatar 4",
        2025,
        "james cameron",
        162,
        "https://i.etsystatic.com/35681979/r/il/dfe3ba/3957859451/il_fullxfull.3957859451_h27r.jpg",
        8.5,
        true,
        true
    ),
    (
        UUID_TO_BIN(UUID()),
        "avatar 5",
        2025,
        "james cameron",
        162,
        "https://i.etsystatic.com/35681979/r/il/dfe3ba/3957859451/il_fullxfull.3957859451_h27r.jpg",
        9.1,
        true,
        true
    ),
    (
        UUID_TO_BIN(UUID()),
        "the shawshank redemption 1",
        1994,
        "frank darabont",
        142,
        "https://i.ebayimg.com/images/g/4goAAOSwMyBe7hnQ/s-l1200.webp",
        9.3,
        false,
        true
    ),
    (
        UUID_TO_BIN(UUID()),
        "the shawshank redemption 2",
        1994,
        "frank darabont",
        142,
        "https://i.ebayimg.com/images/g/4goAAOSwMyBe7hnQ/s-l1200.webp",
        9.3,
        false,
        true
    );

/*
DROP TABLE IF EXISTS movies_genres;
CREATE TABLE movies_genres (
movie_id BINARY(16) REFERENCES movie (id),
genre_id INT REFERENCES genre (id),
PRIMARY KEY (movie_id, genre_id)
);
*/

INSERT INTO
    movies_genres (movie_id, genre_id)
VALUES (
        (
            SELECT id
            FROM movie
            WHERE
                title = "the shawshank redemption"
        ),
        (
            SELECT id
            FROM genre
            WHERE
                name = "drama"
        )
    ),
    (
        (
            SELECT id
            FROM movie
            WHERE
                title = "the dark knight"
        ),
        (
            SELECT id
            FROM genre
            WHERE
                name = "action"
        )
    ),
    (
        (
            SELECT id
            FROM movie
            WHERE
                title = "the dark knight"
        ),
        (
            SELECT id
            FROM genre
            WHERE
                name = "crime"
        )
    ),
    (
        (
            SELECT id
            FROM movie
            WHERE
                title = "the dark knight"
        ),
        (
            SELECT id
            FROM genre
            WHERE
                name = "drama"
        )
    ),
    (
        (
            SELECT id
            FROM movie
            WHERE
                title = "inception"
        ),
        (
            SELECT id
            FROM genre
            WHERE
                name = "action"
        )
    ),
    (
        (
            SELECT id
            FROM movie
            WHERE
                title = "inception"
        ),
        (
            SELECT id
            FROM genre
            WHERE
                name = "adventure"
        )
    ),
    (
        (
            SELECT id
            FROM movie
            WHERE
                title = "inception"
        ),
        (
            SELECT id
            FROM genre
            WHERE
                name = "sci-fi"
        )
    ),
    (
        (
            SELECT id
            FROM movie
            WHERE
                title = "pulp fiction"
        ),
        (
            SELECT id
            FROM genre
            WHERE
                name = "crime"
        )
    ),
    (
        (
            SELECT id
            FROM movie
            WHERE
                title = "pulp fiction"
        ),
        (
            SELECT id
            FROM genre
            WHERE
                name = "drama"
        )
    ),
    (
        (
            SELECT id
            FROM movie
            WHERE
                title = "forrest gump"
        ),
        (
            SELECT id
            FROM genre
            WHERE
                name = "drama"
        )
    ),
    (
        (
            SELECT id
            FROM movie
            WHERE
                title = "forrest gump"
        ),
        (
            SELECT id
            FROM genre
            WHERE
                name = "romance"
        )
    ),
    (
        (
            SELECT id
            FROM movie
            WHERE
                title = "gladiator"
        ),
        (
            SELECT id
            FROM genre
            WHERE
                name = "action"
        )
    ),
    (
        (
            SELECT id
            FROM movie
            WHERE
                title = "gladiator"
        ),
        (
            SELECT id
            FROM genre
            WHERE
                name = "adventure"
        )
    ),
    (
        (
            SELECT id
            FROM movie
            WHERE
                title = "gladiator"
        ),
        (
            SELECT id
            FROM genre
            WHERE
                name = "drama"
        )
    ),
    (
        (
            SELECT id
            FROM movie
            WHERE
                title = "the matrix"
        ),
        (
            SELECT id
            FROM genre
            WHERE
                name = "action"
        )
    ),
    (
        (
            SELECT id
            FROM movie
            WHERE
                title = "the matrix"
        ),
        (
            SELECT id
            FROM genre
            WHERE
                name = "sci-fi"
        )
    ),
    (
        (
            SELECT id
            FROM movie
            WHERE
                title = "interstellar"
        ),
        (
            SELECT id
            FROM genre
            WHERE
                name = "adventure"
        )
    ),
    (
        (
            SELECT id
            FROM movie
            WHERE
                title = "interstellar"
        ),
        (
            SELECT id
            FROM genre
            WHERE
                name = "drama"
        )
    ),
    (
        (
            SELECT id
            FROM movie
            WHERE
                title = "interstellar"
        ),
        (
            SELECT id
            FROM genre
            WHERE
                name = "sci-fi"
        )
    ),
    (
        (
            SELECT id
            FROM movie
            WHERE
                title = "the lord of the rings: the return of the king"
        ),
        (
            SELECT id
            FROM genre
            WHERE
                name = "action"
        )
    ),
    (
        (
            SELECT id
            FROM movie
            WHERE
                title = "the lord of the rings: the return of the king"
        ),
        (
            SELECT id
            FROM genre
            WHERE
                name = "adventure"
        )
    ),
    (
        (
            SELECT id
            FROM movie
            WHERE
                title = "the lord of the rings: the return of the king"
        ),
        (
            SELECT id
            FROM genre
            WHERE
                name = "drama"
        )
    ),
    (
        (
            SELECT id
            FROM movie
            WHERE
                title = "the lion king"
        ),
        (
            SELECT id
            FROM genre
            WHERE
                name = "animation"
        )
    ),
    (
        (
            SELECT id
            FROM movie
            WHERE
                title = "the lion king"
        ),
        (
            SELECT id
            FROM genre
            WHERE
                name = "adventure"
        )
    ),
    (
        (
            SELECT id
            FROM movie
            WHERE
                title = "the lion king"
        ),
        (
            SELECT id
            FROM genre
            WHERE
                name = "drama"
        )
    ),
    (
        (
            SELECT id
            FROM movie
            WHERE
                title = "the avengers"
        ),
        (
            SELECT id
            FROM genre
            WHERE
                name = "action"
        )
    ),
    (
        (
            SELECT id
            FROM movie
            WHERE
                title = "the avengers"
        ),
        (
            SELECT id
            FROM genre
            WHERE
                name = "adventure"
        )
    ),
    (
        (
            SELECT id
            FROM movie
            WHERE
                title = "the avengers"
        ),
        (
            SELECT id
            FROM genre
            WHERE
                name = "sci-fi"
        )
    ),
    (
        (
            SELECT id
            FROM movie
            WHERE
                title = "jurassic park"
        ),
        (
            SELECT id
            FROM genre
            WHERE
                name = "adventure"
        )
    ),
    (
        (
            SELECT id
            FROM movie
            WHERE
                title = "jurassic park"
        ),
        (
            SELECT id
            FROM genre
            WHERE
                name = "sci-fi"
        )
    ),
    (
        (
            SELECT id
            FROM movie
            WHERE
                title = "titanic"
        ),
        (
            SELECT id
            FROM genre
            WHERE
                name = "drama"
        )
    ),
    (
        (
            SELECT id
            FROM movie
            WHERE
                title = "titanic"
        ),
        (
            SELECT id
            FROM genre
            WHERE
                name = "romance"
        )
    ),
    (
        (
            SELECT id
            FROM movie
            WHERE
                title = "the social network"
        ),
        (
            SELECT id
            FROM genre
            WHERE
                name = "drama"
        )
    ),
    (
        (
            SELECT id
            FROM movie
            WHERE
                title = "the social network"
        ),
        (
            SELECT id
            FROM genre
            WHERE
                name = "biography"
        )
    ),
    (
        (
            SELECT id
            FROM movie
            WHERE
                title = "avatar"
        ),
        (
            SELECT id
            FROM genre
            WHERE
                name = "action"
        )
    ),
    (
        (
            SELECT id
            FROM movie
            WHERE
                title = "avatar"
        ),
        (
            SELECT id
            FROM genre
            WHERE
                name = "adventure"
        )
    ),
    (
        (
            SELECT id
            FROM movie
            WHERE
                title = "avatar"
        ),
        (
            SELECT id
            FROM genre
            WHERE
                name = "fantasy"
        )
    ),
    (
        (
            SELECT id
            FROM movie
            WHERE
                title = "avatar 1"
        ),
        (
            SELECT id
            FROM genre
            WHERE
                name = "action"
        )
    ),
    (
        (
            SELECT id
            FROM movie
            WHERE
                title = "avatar 1"
        ),
        (
            SELECT id
            FROM genre
            WHERE
                name = "adventure"
        )
    ),
    (
        (
            SELECT id
            FROM movie
            WHERE
                title = "avatar 1"
        ),
        (
            SELECT id
            FROM genre
            WHERE
                name = "fantasy"
        )
    ),
    (
        (
            SELECT id
            FROM movie
            WHERE
                title = "avatar 2"
        ),
        (
            SELECT id
            FROM genre
            WHERE
                name = "action"
        )
    ),
    (
        (
            SELECT id
            FROM movie
            WHERE
                title = "avatar 2"
        ),
        (
            SELECT id
            FROM genre
            WHERE
                name = "adventure"
        )
    ),
    (
        (
            SELECT id
            FROM movie
            WHERE
                title = "avatar 2"
        ),
        (
            SELECT id
            FROM genre
            WHERE
                name = "fantasy"
        )
    ),
    (
        (
            SELECT id
            FROM movie
            WHERE
                title = "avatar 3"
        ),
        (
            SELECT id
            FROM genre
            WHERE
                name = "action"
        )
    ),
    (
        (
            SELECT id
            FROM movie
            WHERE
                title = "avatar 3"
        ),
        (
            SELECT id
            FROM genre
            WHERE
                name = "adventure"
        )
    ),
    (
        (
            SELECT id
            FROM movie
            WHERE
                title = "avatar 3"
        ),
        (
            SELECT id
            FROM genre
            WHERE
                name = "fantasy"
        )
    ),
    (
        (
            SELECT id
            FROM movie
            WHERE
                title = "avatar 4"
        ),
        (
            SELECT id
            FROM genre
            WHERE
                name = "action"
        )
    ),
    (
        (
            SELECT id
            FROM movie
            WHERE
                title = "avatar 4"
        ),
        (
            SELECT id
            FROM genre
            WHERE
                name = "adventure"
        )
    ),
    (
        (
            SELECT id
            FROM movie
            WHERE
                title = "avatar 4"
        ),
        (
            SELECT id
            FROM genre
            WHERE
                name = "fantasy"
        )
    ),
    (
        (
            SELECT id
            FROM movie
            WHERE
                title = "avatar 5"
        ),
        (
            SELECT id
            FROM genre
            WHERE
                name = "action"
        )
    ),
    (
        (
            SELECT id
            FROM movie
            WHERE
                title = "avatar 5"
        ),
        (
            SELECT id
            FROM genre
            WHERE
                name = "adventure"
        )
    ),
    (
        (
            SELECT id
            FROM movie
            WHERE
                title = "avatar 5"
        ),
        (
            SELECT id
            FROM genre
            WHERE
                name = "fantasy"
        )
    ),
    (
        (
            SELECT id
            FROM movie
            WHERE
                title = "the shawshank redemption 1"
        ),
        (
            SELECT id
            FROM genre
            WHERE
                name = "drama"
        )
    ),
    (
        (
            SELECT id
            FROM movie
            WHERE
                title = "the shawshank redemption 2"
        ),
        (
            SELECT id
            FROM genre
            WHERE
                name = "drama"
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