export const movieModel_mysql_getById = async ({ id, connection }) => {
  const toMakeQuery = `
      SELECT
          m.*,
          GROUP_CONCAT(g.name SEPARATOR ', ') AS genres 
      FROM
          movie m
          JOIN movies_genres mg ON m.id = mg.movie_id
          JOIN genre g ON mg.genre_id = g.id
      WHERE
          BIN_TO_UUID(m.id) = ?
      GROUP BY
          m.id 
      LIMIT 1
    `

  const valuesToSql = [id]

  const [data] = await connection.query(toMakeQuery, valuesToSql)

  return data[0]
}
