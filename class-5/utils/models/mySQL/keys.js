export const KEYS_SQUEMA = {
  title: "title",
  year: "year",
  yearfrom: "yearfrom",
  yearuntil: "yearuntil",
  yearbetween: "yearbetween",
  director: "director",
  duration: "duration",
  durationfrom: "durationfrom",
  durationuntil: "durationuntil",
  durationbetween: "durationbetween",
  poster: "poster",
  genre: "genre",
  rate: "rate",
  ratefrom: "ratefrom",
  rateuntil: "rateuntil",
  ratebetween: "ratebetween",
  oscar: "oscar",
  basedonbook: "basedonbook",
  overwrite: "overwrite"
}

export const KEYS_QUERY_TYPE = {
  isStringArr: "isStringArr",
  isStringDef: "isStringDef",
  isBoolean: "isBoolean",
  isNumber: "isNumber",
  isSpecificFormat: "isSpecificFormat"
}

export const KEYS_QUERY = {
  [KEYS_SQUEMA.title]: {
    key: "title",
    type: KEYS_QUERY_TYPE.isStringDef,
    isPatch: {
      toSQL: "title ="
    }
  },
  [KEYS_SQUEMA.genre]: {
    key: "genre",
    type: KEYS_QUERY_TYPE.isStringArr,
    toSQL: {
      having: "genre",
      where: "g.name"
    }
  },

  [KEYS_SQUEMA.rate]: {
    key: "rate",
    type: KEYS_QUERY_TYPE.isNumber,
    isPatch: {
      toSQL: "rate ="
    }
  },
  [KEYS_SQUEMA.ratefrom]: {
    key: "ratefrom",
    type: KEYS_QUERY_TYPE.isNumber,
    toSQL: "rate >="
  },
  [KEYS_SQUEMA.rateuntil]: {
    key: "rateuntil",
    type: KEYS_QUERY_TYPE.isNumber,
    toSQL: "rate <="
  },
  [KEYS_SQUEMA.ratebetween]: {
    key: "ratebetween",
    type: KEYS_QUERY_TYPE.isSpecificFormat,
    toSQL: "rate BETWEEN"
  },

  [KEYS_SQUEMA.oscar]: {
    key: "oscar",
    type: KEYS_QUERY_TYPE.isBoolean
  },
  [KEYS_SQUEMA.basedonbook]: {
    key: "basedonbook",
    type: KEYS_QUERY_TYPE.isBoolean
  },
  [KEYS_SQUEMA.director]: {
    key: "director",
    type: KEYS_QUERY_TYPE.isStringDef
  },

  [KEYS_SQUEMA.yearfrom]: {
    key: "yearfrom",
    type: KEYS_QUERY_TYPE.isNumber,
    toSQL: "year >="
  },
  [KEYS_SQUEMA.yearuntil]: {
    key: "yearuntil",
    type: KEYS_QUERY_TYPE.isNumber,
    toSQL: "year <="
  },
  [KEYS_SQUEMA.yearbetween]: {
    key: "yearbetween",
    type: KEYS_QUERY_TYPE.isSpecificFormat,
    toSQL: "year BETWEEN"
  },
  [KEYS_SQUEMA.year]: {
    key: "year",
    type: KEYS_QUERY_TYPE.isNumber,
    isPatch: {
      toSQL: "year ="
    }
  },

  [KEYS_SQUEMA.durationfrom]: {
    key: "durationfrom",
    type: KEYS_QUERY_TYPE.isNumber,
    toSQL: "duration >="
  },
  [KEYS_SQUEMA.durationuntil]: {
    key: "durationuntil",
    type: KEYS_QUERY_TYPE.isNumber,
    toSQL: "duration <="
  },
  [KEYS_SQUEMA.durationbetween]: {
    key: "durationbetween",
    type: KEYS_QUERY_TYPE.isSpecificFormat,
    toSQL: "duration BETWEEN"
  },
  [KEYS_SQUEMA.duration]: {
    key: "duration",
    type: KEYS_QUERY_TYPE.isNumber,
    isPatch: {
      toSQL: "duration ="
    }
  }
}

export const QUERY_KEYS_LIST = Object.values(KEYS_QUERY).reduce(
  (group, product) => {
    const { type } = product

    group[type] = group[type] ?? []
    group[type].push(product.key)
    return group
  },
  {}
)
