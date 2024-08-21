import { randomUUID } from "node:crypto"
import { readJSON } from "../../utils/readJSON.js"

const allMoviesJSON = readJSON({ filePath: "../data/movies.json" })

const QUERY_KEYS_TYPE = {
  isStringArr: "isStringArr",
  isStringDef: "isStringDef",
  isBoolean: "isBoolean",
  isNumber: "isNumber",
  isSpecificFormat: "isSpecificFormat"
}

export const QUERY_KEYS = {
  GENRE: {
    key: "genre",
    type: QUERY_KEYS_TYPE.isStringArr
  },
  RATEFROM: {
    key: "rateFrom",
    type: QUERY_KEYS_TYPE.isNumber
  },
  RATEUNTIL: {
    key: "rateUntil",
    type: QUERY_KEYS_TYPE.isNumber
  },
  RATEBETWEEN: {
    key: "rateBetween",
    type: QUERY_KEYS_TYPE.isSpecificFormat
  },
  OSCAR: {
    key: "oscar",
    type: QUERY_KEYS_TYPE.isBoolean
  },
  BASEDONBOOK: {
    key: "basedOnBook",
    type: QUERY_KEYS_TYPE.isBoolean
  },
  DIRECTOR: {
    key: "director",
    type: QUERY_KEYS_TYPE.isStringDef
  },
  YEARFROM: {
    key: "yearFrom",
    type: QUERY_KEYS_TYPE.isNumber
  },
  YEARUNTIL: {
    key: "yearUntil",
    type: QUERY_KEYS_TYPE.isNumber
  },
  YEARBETWEEN: {
    key: "yearBetween",
    type: QUERY_KEYS_TYPE.isSpecificFormat
  }
}

const QUERY_KEYS_LIST = Object.values(QUERY_KEYS).reduce((group, product) => {
  const { type } = product

  group[type] = group[type] ?? []
  group[type].push(product.key)
  return group
}, {})

export class MovieModel_local_INDEX {
  static getAll = async ({ allQueries }) => {
    let filteredQueries = Object.entries(allQueries)
      .filter(([key]) => {
        if (key === QUERY_KEYS?.[key.toUpperCase()]?.["key"]) return true
      })
      .map(([key, value]) => {
        let typeFound = null
        for (const x in QUERY_KEYS_LIST) {
          const howToTreathData = x
          const values_QTL = QUERY_KEYS_LIST[x]

          const whichTypeIs =
            values_QTL.indexOf(key) !== -1 ? howToTreathData : null

          if (whichTypeIs) {
            typeFound = whichTypeIs
            break
          }
        }
        return {
          key,
          value,
          typeFound
        }
      })

    const dataFiltered = allMoviesJSON.filter((xFilter) => {
      let conditionsToCheck = []
      filteredQueries.forEach(({ key, value, typeFound }) => {
        if (typeFound === QUERY_KEYS_TYPE["isStringArr"]) {
          const founded = xFilter[key].some(
            (g) => g.toLowerCase() === value.toLowerCase()
          )
          conditionsToCheck.push(founded)
        }

        if (typeFound === QUERY_KEYS_TYPE["isStringDef"]) {
          let founded =
            xFilter[key].replaceAll(" ", "_").toLowerCase() ===
            value.toLowerCase()
          conditionsToCheck.push(founded)
        }
        if (typeFound === QUERY_KEYS_TYPE["isBoolean"]) {
          let founded = String(xFilter[key]) === String(value)
          conditionsToCheck.push(founded)
        }

        if (typeFound === QUERY_KEYS_TYPE["isNumber"]) {
          let theKeyToLowerCase = key.toLowerCase()

          if (theKeyToLowerCase.includes("from")) {
            let toEnterOnData = key.replace("From", "")

            let founded = Number(xFilter[toEnterOnData]) >= Number(value)
            conditionsToCheck.push(founded)
          }

          if (theKeyToLowerCase.includes("until")) {
            let toEnterOnData = key.replace("Until", "")

            let founded = Number(xFilter[toEnterOnData]) <= Number(value)
            conditionsToCheck.push(founded)
          }
        }

        if (typeFound === QUERY_KEYS_TYPE["isSpecificFormat"]) {
          let toEnterOnData = key.replace("Between", "")
          const [lowerValue, higherValue] = value.split("-")

          let founded =
            Number(xFilter[toEnterOnData]) >= Number(lowerValue) &&
            Number(xFilter[toEnterOnData]) <= Number(higherValue)

          conditionsToCheck.push(founded)
        }
      })

      let toReturn = conditionsToCheck.every((x) => x === true)

      return toReturn
    })

    const { page, limit } = allQueries
    const actualPage = page ? parseInt(page, 10) : 1
    const limitFormatted = limit ? parseInt(limit, 10) : 10

    const offset = page ? (actualPage - 1) * limitFormatted : 0

    const totalAmountResourcesToShow = dataFiltered.length
    const totalPages = Math.ceil(dataFiltered.length / limitFormatted)
    const prevPage = actualPage > 1 ? actualPage - 1 : null
    const nextPage = actualPage < totalPages ? actualPage + 1 : null
    const surpassedTotalPages = actualPage > totalPages

    const dataSliced = dataFiltered.slice(offset, limitFormatted + offset)

    const howMuchShowingNow = dataSliced.length

    const objToReturn = {
      data: dataSliced,
      actualPage,
      totalPages,
      howMuchShowingNow,
      totalAmountResourcesToShow,
      prevPage,
      nextPage,
      surpassedTotalPages
    }

    return objToReturn
  }

  static getById = async ({ id }) => {
    const found = allMoviesJSON.find((x) => {
      return Number(x.id) === Number(id) || Number(x.idToPATCH) === Number(id)
    })
    return found
  }

  static create = async ({ input }) => {
    const newMovie = {
      id: randomUUID(),
      idToPATCH: Object.keys(allMoviesJSON).length + 1,
      ...input
    }

    allMoviesJSON.push(newMovie)

    return newMovie
  }

  static patch = async ({ id, input }) => {
    const movieIndex = allMoviesJSON.findIndex((movie) => {
      return (
        Number(movie?.id) === Number(id) ||
        Number(movie?.idToPATCH) === Number(id)
      )
      // return Number(movie?.idToPATCH) === Number(id)
    })

    if (movieIndex === -1) return { status: false, updatedMovie: null }

    const updatedMovie = {
      ...allMoviesJSON[movieIndex],
      ...input
    }

    allMoviesJSON[movieIndex] = updatedMovie
    return { status: true, updatedMovie }
  }

  static delete = async ({ id }) => {
    const movieIndex = allMoviesJSON.findIndex((movie) => {
      return (
        Number(movie?.id) === Number(id) ||
        Number(movie?.idToPATCH) === Number(id)
      )
    })

    if (movieIndex === -1) return false

    allMoviesJSON.splice(movieIndex, 1)

    return true
  }
}
