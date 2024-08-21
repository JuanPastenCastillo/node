import { getConditions } from "./getConditions.js"
import { getFiltersByUser } from "./getFiltersByUser.js"
import { getPageLimit } from "./getPageLimit.js"

export const processingSQL = ({ allQueries }) => {
  const { theQueries: filteredQueries, pageLimit } = filteredQueriesFn({
    allQueries
  })

  let toMakeQuery

  if (filteredQueries.length === 0) {
    const { defaultQuery } = queryTemplateToSQL({})
    toMakeQuery = defaultQuery

    return { toMakeQuery, pageLimit }
  } else {
    const { queryWithConditions, interpolationsValues, interpolationsKeys } =
      queryTemplateToSQL({
        theFilters: filteredQueries
      })
    toMakeQuery = queryWithConditions

    return { toMakeQuery, pageLimit, interpolationsValues, interpolationsKeys }
  }
}

const filteredQueriesFn = ({ allQueries }) => {
  const queriesToFilter = Object.entries(allQueries)

  const theQueries = getFiltersByUser({
    dataToUse: queriesToFilter
  })

  const pageLimit = getPageLimit({
    dataToUse: queriesToFilter
  })

  return {
    theQueries,
    pageLimit
  }
}

const queryTemplateToSQL = ({ theFilters = null }) => {
  if (theFilters === null) {
    const defaultQuery = `
      SELECT
          m.*,
          BIN_TO_UUID(m.id) AS movie_uuid, 
          GROUP_CONCAT(g.name SEPARATOR ', ') AS genre
      FROM
          movie m
          JOIN movies_genres mg ON m.id = mg.movie_id
          JOIN genre g ON mg.genre_id = g.id
      GROUP BY
          m.id 
      
    `

    return { defaultQuery }
  }

  const { clauseHaving, interpolationsValues, interpolationsKeys } =
    getConditions({
      queriesFiltered: theFilters
    })

  const queryWithConditions = `
  SELECT
      m.*,
      BIN_TO_UUID(m.id) AS movie_uuid, 
      GROUP_CONCAT(g.name SEPARATOR ', ') AS genre
  FROM
      movie m
      JOIN movies_genres mg ON m.id = mg.movie_id
      JOIN genre g ON mg.genre_id = g.id
  GROUP BY
      m.id 
  ${clauseHaving.replaceAll("'", "")}
  `
  return { queryWithConditions, interpolationsValues, interpolationsKeys }
}
