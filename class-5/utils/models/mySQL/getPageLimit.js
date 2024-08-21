const QUERY_LIMIT_OFFSET = {
  LIMIT: {
    key: "limit"
  },
  PAGE: {
    key: "page"
  }
}

export const getPageLimit = ({ dataToUse }) => {
  return dataToUse
    .filter(([key]) => {
      if (
        key.toLowerCase() === QUERY_LIMIT_OFFSET?.[key.toUpperCase()]?.["key"]
      )
        return true
    })
    .map(([key, value]) => {
      return {
        key: key.toLowerCase(),
        value
      }
    })
}
