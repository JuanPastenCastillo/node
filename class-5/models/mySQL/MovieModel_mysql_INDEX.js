import { mysql_connection } from "./connection/mysql_connection.js"
import { movieModel_mysql_delete } from "./methods/movieModel_mysql_delete.js"
import { movieModel_mysql_getAll } from "./methods/movieModel_mysql_getAll.js"
import { movieModel_mysql_getById } from "./methods/movieModel_mysql_getById.js"
import { movieModel_mysql_getDeleteInsertGenresId } from "./methods/movieModel_mysql_getDeleteInsertGenresId.js"
import { movieModel_mysql_patchPut } from "./methods/movieModel_mysql_patchPut.js"
import { movieModel_mysql_post } from "./methods/movieModel_mysql_post.js"

const { connection } = await mysql_connection()

// ❌This way to make the query force you to use callbacks. Do not use it
// connection.query("SELECT ... FROM ...", (err, results) => {})

export class MovieModel_mysql_INDEX {
  static async getAll({ allQueries }) {
    return movieModel_mysql_getAll({ allQueries, connection })
  }

  static getById = async ({ id }) => {
    return movieModel_mysql_getById({ id, connection })
  }

  static async post({ input }) {
    return movieModel_mysql_post({ input, connection })
  }

  static async patchPut({ id, input, isPut = false }) {
    const { resultToFetchToDB, theQueriesWithGenre } =
      await movieModel_mysql_patchPut({
        id,
        input,
        connection
      })

    let updatedGenres = null

    if (theQueriesWithGenre.length > 0) {
      try {
        const { updated } = await movieModel_mysql_getDeleteInsertGenresId({
          connection,
          genre: theQueriesWithGenre[0].value,
          idToInsertOnMovie: id,
          shouldDeleteBeforeInsert: isPut
        })

        updatedGenres = updated
      } catch (error) {
        await connection.rollback()
        return {
          errorMessage: `Was not possible to create the genres «${new Intl.ListFormat(
            "en"
          ).format(theQueriesWithGenre[0].value)}» for the movie`
        }
      }
    }

    return {
      updatedMovie: resultToFetchToDB["updatedMovie"],
      updatedGenres,
      connection
    }
  }

  static async delete({ id }) {
    return movieModel_mysql_delete({ id, connection })
  }
}
