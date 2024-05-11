/* node --watch class-4/app.js */

const express = require("express")
const crypto = require("node:crypto")
const cors = require("cors")
const { validateMovie, validatePartialMovies } = require("./schemas/movies")
const allMoviesJSON = require("./data/movies.json")
const { toJSON } = require("./utils/toJSON")
const { formatResponse } = require("./utils/formatResponse")
const { moviesQueryParams } = require("./utils/moviesQueryParams")
const { originChecked } = require("./utils/originChecked")

const app = express()
app.disable("x-powered-by")

const ROUTES = {
  MOVIES: "/movies",
  HOME: "/"
}

const ACCEPTED_ORIGINS = [
  "http://localhost:8080",
  "http://localhost:3000",
  "https://movies.com", // This could be the production
  "https://juanpastencastillo.com"
]

app.get(ROUTES.HOME, (req, res) => {
  res.json({ message: "This is the endpoint for home" })
})

app.use((req, res, next) => {
  if (req.url.startsWith(ROUTES.MOVIES)) {
    if (req.method === "GET") {
      const { acceptedOrigin, origin } = originChecked({
        req,
        ACCEPTED_ORIGINS
      })

      if (!acceptedOrigin) {
        return res.status(403).send({ error: "Origin not accepted" })
      }

      res.header("Access-Control-Allow-Origin", origin)

      const { format = "json" } = req.query

      if (format.toLowerCase() === "json") {
        req._format = "json"

        return next()
      } else {
        req._format = format.toLowerCase()
        return next()
      }
    } else if (req.method === "POST" || req.method === "PATCH") {
      toJSON({ req, next })
    } else if (req.method === "DELETE" && /movies\/*/.test(req.url)) {
      const { acceptedOrigin, origin } = originChecked({
        req,
        ACCEPTED_ORIGINS
      })

      if (!acceptedOrigin) {
        return res.status(403).send({ error: "Origin not accepted" })
      }

      res.header("Access-Control-Allow-Origin", origin)

      return next()
    } else if (req.method === "OPTIONS") {
      const { acceptedOrigin, origin } = originChecked({
        req,
        ACCEPTED_ORIGINS
      })

      if (!acceptedOrigin) {
        return res.status(403).send({ error: "Origin not accepted" })
      }

      res.header("Access-Control-Allow-Origin", origin)
      res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE"
      )
      res.sendStatus(204)
    } else {
      return next()
    }
  } else {
    return next()
  }
})

app.get(ROUTES.MOVIES, (req, res) => {
  const { page, limit } = req.query
  const pageFormatted = page ? parseInt(page, 10) : 1
  const limitFormatted = limit ? parseInt(limit, 10) : 10

  const offset = page ? (pageFormatted - 1) * limitFormatted : 0

  const pagination = {
    pageFormatted,
    limitFormatted,
    offset
  }
  const dataFiltered = moviesQueryParams(
    {
      allQueries: req.query,
      dataToFilter: allMoviesJSON
    },
    { pagination }
  )

  formatResponse({
    _actualFormat: req._format,
    theResMethod: res,
    theResBody: dataFiltered
  })
})

app.get(`${ROUTES.MOVIES}/:id`, (req, res) => {
  const { id } = req.params
  const movie = allMoviesJSON.find((movie) => movie.id === id)
  if (!movie) {
    return res.status(404).send({ message: `Movie not found with id «${id}»` })
  } else {
    formatResponse({
      _actualFormat: req._format,
      theResMethod: res,
      theResBody: movie
    })
  }
})

app.post(ROUTES.MOVIES, (req, res) => {
  const requestValidated = validateMovie({ objectToValidate: req.body })

  if (requestValidated.error) {
    return res
      .status(400)
      .json({ error: JSON.parse(requestValidated.error.message) })
  }

  const newMovie = {
    id: crypto.randomUUID(), // uuid v4
    idToPATCH: Object.keys(allMoviesJSON).length + 1,
    ...requestValidated.data
  }

  allMoviesJSON.push(newMovie)

  res.status(201).json(newMovie)
})

app.patch(`${ROUTES.MOVIES}/:idToPATCH`, (req, res) => {
  const requestValidated = validatePartialMovies({ objectToValidate: req.body })
  if (requestValidated.error) {
    return res
      .status(400)
      .json({ error: JSON.parse(requestValidated.error.message) })
  }

  const { idToPATCH } = req.params
  const movieIndex = allMoviesJSON.findIndex((movie) => {
    return Number(movie?.idToPATCH) === Number(idToPATCH)
  })

  if (movieIndex === -1) {
    return res
      .status(404)
      .json({ message: `Movie not found with id «${idToPATCH}»` })
  }

  const updatedMovie = {
    ...allMoviesJSON[movieIndex],
    ...requestValidated.data
  }

  allMoviesJSON[movieIndex] = updatedMovie

  return res.json(updatedMovie)
})

/* 
This is important: the Idempotence. Is the property of realize an action several times and even though achieve the same result as you would  get with the first try. Pure functions are idempotent. This property talk about the inner state of something. Now the methods:

- Purpose of POST: create a new element/resource on server
  + On URL: `/movies`
  + Idempotence: this is not idempotente because every time you call this method a new resource is created
- Purpose of PUT: update an existing element/resource on server o create it if it doesn't exist
  + On URL: `/movies/:id` → `/movies/123-456-789`
  + Idempotence: this is idempotente the bast majority of the time, but it could not be sometimes
- Purpose of PATCH: update partially an existing element/resource on server
  + On URL: `/movies/:id` → `/movies/123-456-789`
  + Idempotence: this is not idempotente ithe bast majority of the time, but it could be sometimes
  
One question, is it danger to create the ID from outside? The answer: it could be but this will depend of the context of the application. For example, sometimes this ID can come from outside: the email of an user for example or other thing that will identify that person as unique in the analog world

*/

app.delete(`${ROUTES.MOVIES}/:id`, (req, res) => {
  const { id } = req.params
  const movieIndex = allMoviesJSON.findIndex((movie) => {
    return Number(movie?.id) === Number(id) || movie.id === id
  })

  if (movieIndex === -1) {
    return res.status(404).json({ message: `Movie not found with id «${id}»` })
  }

  allMoviesJSON.splice(movieIndex, 1)
  return res.json({ message: `Movie deleted with id «${id}»` })
})

const PORT = process.env.PORT ?? 3000
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})
