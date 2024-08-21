import { KEYS_QUERY_TYPE } from "./keys.js"

export const getConditions = ({
  queriesFiltered,
  whichCondition = "HAVING"
}) => {
  let clauseHaving = `${whichCondition} `
  let interpolationsValues = []
  let interpolationsKeys = []
  const conditions = queriesFiltered.map((query) => {
    const theKey = query.key
    const theValue = query.value
    const theType = query.typeFound
    const toSQL = query.toSQL
    const isPatch = query?.isPatch

    if (theType === KEYS_QUERY_TYPE.isStringDef) {
      interpolationsValues.push(theValue.replace("_", " "))
      interpolationsKeys.push(theKey)

      if (isPatch) {
        return `${isPatch} ?`
      }

      return `${theKey} LIKE ?`
    } else if (theType === KEYS_QUERY_TYPE.isStringArr) {
      if (Array.isArray(theValue)) {
        let theQuery = ""
        theValue.forEach((_, index) => {
          if (index === 0) {
            theQuery += `${theKey} LIKE ? AND `
          } else {
            theQuery += `${theKey} LIKE ?`
          }
          interpolationsValues.push(`%${theValue[index]}%`)
          interpolationsKeys.push(theKey)
        })

        return theQuery
      }

      interpolationsValues.push(`%${theValue}%`)
      interpolationsKeys.push(theKey)

      return `${theKey} LIKE ?`
    } else if (theType === KEYS_QUERY_TYPE.isBoolean) {
      interpolationsValues.push(theValue)
      interpolationsKeys.push(theKey)

      return `${theKey} = ?`
    } else if (theType === KEYS_QUERY_TYPE.isNumber) {
      interpolationsValues.push(theValue)

      if (isPatch) {
        interpolationsKeys.push(theKey)
        return `${isPatch} ?`
      }

      interpolationsKeys.push(toSQL)

      return `${toSQL} ?`
    } else if (theType === KEYS_QUERY_TYPE.isSpecificFormat) {
      if (theKey.includes("between")) {
        const [lowerValue, higherValue] = theValue.split("-")

        interpolationsValues.push(lowerValue)
        interpolationsValues.push(higherValue)
        interpolationsKeys.push(toSQL)

        return `${toSQL} ? AND ?`
      }
    }
    return ""
  })
  clauseHaving += conditions.join(" AND ")

  return { clauseHaving, interpolationsValues, interpolationsKeys }
}
