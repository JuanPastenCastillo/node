import { getConditions } from "../../../utils/models/mySQL/getConditions.js"
import { getFiltersByUser } from "../../../utils/models/mySQL/getFiltersByUser.js"

export const movieModel_mysql_patchPut = async ({ id, input, connection }) => {
  await connection.beginTransaction()

  const allQueries = Object.entries(input)

  const theQueries = getFiltersByUser({
    dataToUse: allQueries
  })

  const theQueriesWithoutGenre = theQueries.filter((x) => x.key !== "genre")

  const theQueriesWithGenre = theQueries.filter((x) => x.key === "genre")

  if (theQueriesWithoutGenre.length === 0) {
    const resultToFetchToDB = {
      updatedMovie: null
    }

    return { resultToFetchToDB, theQueriesWithGenre }
  }

  const theConditions = getConditions({
    queriesFiltered: theQueriesWithoutGenre,
    whichCondition: "WHERE"
  })

  const conditionsKeysToSQL = theConditions.interpolationsKeys.map(
    (x, index) => {
      /* This "howMuchSpace" is only for formatt purpose for the developer, not even for the database */
      const howMuchSpace = index === 0 ? "" : " "

      return `${howMuchSpace}${x} = ?`
    }
  )

  const formattedValues = theConditions.interpolationsValues.map((x) => {
    if (x === "true") {
      return 1
    } else if (x === "false") {
      return 0
    }

    return x
  })

  const conditionsValuesToSQL = [...formattedValues, id]

  const toMakeQuery = `
    UPDATE movie m
    SET
        ${conditionsKeysToSQL}
    WHERE
        BIN_TO_UUID(m.id) = ?
  `

  let resultToFetchToDB = {
    updatedMovie: null
  }

  try {
    const [data] = await connection.query(toMakeQuery, conditionsValuesToSQL)

    resultToFetchToDB["updatedMovie"] = data
  } catch (error) {
    await connection.rollback()
    resultToFetchToDB["updatedMovie"] = null
  }

  return { resultToFetchToDB, theQueriesWithGenre }
}
