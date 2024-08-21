export const movieModel_mysql_getDeleteInsertGenresId = async ({
  genre,
  idToInsertOnMovie,
  shouldDeleteBeforeInsert = false,
  connection
}) => {
  try {
    const genresIds = await Promise.all(
      genre.map(async (genreName) => {
        try {
          const [genreData] = await connection.query(
            "SELECT id FROM genre WHERE name = ?",
            [genreName]
          )

          if (genreData.length > 0) {
            return genreData[0].id
          } else {
            throw new Error("Genre not found")
          }
        } catch (error) {
          await connection.rollback()
          throw new Error(error)
        }
      })
    )

    if (shouldDeleteBeforeInsert) {
      try {
        await connection.query(
          "DELETE FROM movies_genres WHERE movie_id = UUID_TO_BIN(?)",
          [idToInsertOnMovie]
        )
      } catch (error) {
        throw new Error("Was not possible to delete actual genres")
      }
    }

    const valuesToInsertGenresSQL = genresIds.map(
      (genreId) => `(UUID_TO_BIN('${idToInsertOnMovie}'), ${genreId})`
    )

    const queryInsertGenresSQL = `INSERT INTO movies_genres (movie_id, genre_id) VALUES ${valuesToInsertGenresSQL.join(
      ", "
    )}`

    await connection.query(queryInsertGenresSQL, valuesToInsertGenresSQL)

    return { updated: true }
  } catch (error) {
    throw new Error(error)
  }
}
