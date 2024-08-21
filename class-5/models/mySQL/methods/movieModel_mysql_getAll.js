import { calcPagination } from "../../../utils/models/mySQL/calcPagination.js"
import { processingSQL } from "../../../utils/models/mySQL/processingSQL.js"

// movieModel_mysql_getById

export const movieModel_mysql_getAll = async ({ allQueries, connection }) => {
  await connection.beginTransaction()

  const { toMakeQuery, pageLimit, interpolationsValues } = processingSQL({
    allQueries
  })

  let valuesToSql = interpolationsValues
    ? interpolationsValues.flat(Infinity)
    : []

  /* 
  !FH99
  It should be a way to make this query with the filters on the database but only retrieving the total number of items, not all the data
  */
  const [totalItems] = await connection.query(toMakeQuery, valuesToSql)

  const extractedData = {}
  pageLimit.forEach(({ key, value }) => {
    extractedData[key] = Number(value)
  })

  const defaultPageLimit = {
    page: 1,
    limit: 10
  }

  const { page = defaultPageLimit.page, limit = defaultPageLimit.limit } =
    extractedData

  const actualPage = page ? parseInt(page, 10) : defaultPageLimit.page
  const limitFormatted = limit ? parseInt(limit, 10) : defaultPageLimit.limit
  const offset = page ? (actualPage - 1) * limitFormatted : 0

  let sql = toMakeQuery
  sql += `LIMIT ? OFFSET ${offset}`
  sql += ";"

  valuesToSql.push(limitFormatted)

  /*
  let theData
  try {
    const [data] = await connection.query(sql, valuesToSql)
    theData = data
  } catch (error) {
    await connection.rollback()
    console.error("error:", error)
    throw new Error(error)
  }

  await connection.commit()
  */

  const [data] = await connection.query(sql, valuesToSql)

  const toPaginationCalculated = calcPagination({
    totalItems,
    actualPage,
    limitFormatted,
    offset
  })

  return {
    data,
    pagination: toPaginationCalculated
  }
}
