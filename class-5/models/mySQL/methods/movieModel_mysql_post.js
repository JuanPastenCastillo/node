import { movieModel_mysql_getDeleteInsertGenresId } from "./movieModel_mysql_getDeleteInsertGenresId.js"

export const movieModel_mysql_post = async ({ input, connection }) => {
  await connection.beginTransaction()

  const {
    title,
    year,
    director,
    duration,
    poster,
    rate,
    oscar,
    basedOnBook,
    genre
  } = input

  const valuesToInsertMovieSQL = [
    title,
    year,
    director,
    duration,
    poster,
    rate,
    oscar,
    basedOnBook
  ]

  let uuidResult

  // Get UUID() from mySQL database
  try {
    const [uuidResultQuery] = await connection.query("SELECT UUID() AS uuid;")
    const [{ uuid }] = uuidResultQuery

    uuidResult = uuid
  } catch (error) {
    await connection.rollback()
    return {
      errorMessage: `Was not possible to create the UUID from the database for the movie '${title}'`
    }
  }

  // INSERT data of movie on DB
  try {
    const toMakeQuery = `
      INSERT INTO movie (id, title, year, director, duration, poster, rate, oscar, basedOnBook)
      VALUES (UUID_TO_BIN('${uuidResult}'), ?, ?, ?, ?, ?, ?, ?, ?)
      `

    await connection.query(toMakeQuery, valuesToInsertMovieSQL)
  } catch (error) {
    await connection.rollback()
    return {
      errorMessage: `Was not possible to create the new movie ('${title}') on the database`
    }
  }

  // INSERT genres on DB
  try {
    await movieModel_mysql_getDeleteInsertGenresId({
      genre,
      idToInsertOnMovie: uuidResult,
      connection,
      title
    })
  } catch (error) {
    await connection.rollback()
    return {
      errorMessage: `Was not possible to create the genres «${new Intl.ListFormat(
        "en"
      ).format(genre)}» for the movie «${title}»`
    }
  }

  await connection.commit()

  let newMovieCreatedRetrieved

  /* Return created movie to the user */
  try {
    const [newMovieRetrieved] = await connection.query(
      `SELECT
            BIN_TO_UUID(m.id) AS movie_uuid,
            m.*
        FROM
            movie m
        WHERE 
            BIN_TO_UUID(m.id) = ?`,
      [uuidResult]
    )

    newMovieCreatedRetrieved = newMovieRetrieved
  } catch (error) {
    return {
      errorMessage: `Was not possible to recover the new movie ('${title}')`
    }
  }

  return newMovieCreatedRetrieved[0]
}
