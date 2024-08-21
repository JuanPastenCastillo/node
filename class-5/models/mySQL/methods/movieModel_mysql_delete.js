export const movieModel_mysql_delete = async ({ id, connection }) => {
  await connection.beginTransaction()

  const toMakeQuery = `
    DELETE FROM movie m
    WHERE
        BIN_TO_UUID(m.id) = ?
  `

  const conditionsValuesToSQL = [id]

  let theData = {
    data: null
  }
  try {
    const [data] = await connection.query(toMakeQuery, conditionsValuesToSQL)

    if (data.affectedRows === 0) {
      throw new Error("Movie not found")
    }

    theData["data"] = data
  } catch (error) {
    await connection.rollback()
    return {
      errorMessage: true
    }
  }

  await connection.commit()

  return {
    data: theData["data"]
  }
}
