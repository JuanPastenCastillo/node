import { KEYS_QUERY, QUERY_KEYS_LIST } from "./keys.js"

export const getFiltersByUser = ({ dataToUse }) => {
  return dataToUse
    .filter(([key]) => {
      const keyToLowerCase = key.toLowerCase()

      if (keyToLowerCase === KEYS_QUERY?.[keyToLowerCase]?.["key"]) {
        return true
      }
    })
    .map(([key, value]) => {
      const keyToLowerCase = key.toLowerCase()

      let typeFound = null
      for (const x in QUERY_KEYS_LIST) {
        const howToTreathData = x
        const values_QTL = QUERY_KEYS_LIST[x]

        const whichTypeIs =
          values_QTL.indexOf(keyToLowerCase) !== -1 ? howToTreathData : null

        if (whichTypeIs) {
          typeFound = whichTypeIs
          break
        }
      }

      const formatValue = Array.isArray(value)
        ? value.map((x) => x.toLowerCase())
        : String(value).toLowerCase()

      const toSQL = KEYS_QUERY[key.toLowerCase()].toSQL ?? null
      const isPatch = KEYS_QUERY[key.toLowerCase()].isPatch?.toSQL ?? null

      return {
        key: key.toLowerCase(),
        value: formatValue,
        typeFound,
        toSQL,
        isPatch
      }
    })
}
