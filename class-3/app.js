/* node --watch class-3/app.js */

/* 
In this class a REST will be created. 
  - REST mean: Representational State Transfer an Software Architecture (not a framework, not a library, not an idea, not a pattern). 
  - Was created to transfer data specially on web.
  - Was created on the 2000 year by Roy Fielding 

Principals features on REST:
  - Scalability
  - Simplicity
  - Visibility
  - Portability
  - Realiability 
  - Easy to modify

All Software Architecture should achieve a goal with some principals that can sustain over time the best possible way and simplify the creation of that piece of software. This is the goal of every Software Architecture

Fundamentals on REST:
  - Resources: everything here is a resource (a user, book, some publication, an image or a collection of this resources, a list of users, books, and so on). Every resource will be identified with an URL
  - Methods: what kind of action you want to do with the resource. This could be a GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS, CONNECT, or TRACE. The most common actions made here are the "CRUD" → Create (POST), Read (GET), Update (PUT or PATCH), Delete (DELETE)
  - Representation: This is how the resource is represented: the most common representation is JSON but is not mandatory, this could be also XML, HTML, CSV, etc. The client decide which representation be the resource, having none restriction on the format. One client can ask for a JSON while other client can ask for a XML representation
  - Stateless: every request to the server should contain all the neccesary data to understand that request. This mean the server should not be able to remember anything about the request. For example it cannot save how many calls have been made to the server, it have to make pagination or not, that data should be always on the URL of the request. Sometimes some data can be save to help the client but in that case the REST architecture will be break. Another case is when we have some database on the backend.
  - Unified interfaz: this is difficul to break it but it means that the interfaz between client and server should be consistent for every interaction. The URLs should always do the same, should always be called the same
  - Separation of concepts: components of client and server should be separated. This allow the server and the client evolve independently

Caveat 🟨:
  - Sometimes you can make some API that is not REST, another architecture exist (like SOAP or GraphQL
  ). Some people think that an API that return a JSON is immediately a REST API but it is not always the case.
*/

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
/* The problem with this without any option inside the cors is that allow all request from everyone. It use this *. But with the proper options/configuration, it can be behave the same way we have on the express native solution */
// app.use(
//   cors({
//     origin: (origin, callback) => {
//       const ACCEPTED_ORIGINS_INSIDE_LIBRARY = [
//         "http://localhost:8080",
//         "http://localhost:3000",
//         "https://movies.com", // This is the production
//         "https://juanpastencastillo.com"
//       ]

//       if (ACCEPTED_ORIGINS_INSIDE_LIBRARY.includes(origin) || !origin) {
//         return callback(null, true)
//       }

//       return callback(new Error("Not allowed by CORS"))
//     }
//   })
// )

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

/* An endpoint of a path (some URL) where you have some resource to extract data*/
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
      /*
      The CORS is a little bit more stric with some methods:
        - Normal methods: GET, HEAD and POST
        - Complex methods: PUT, PATCH and DELETE
      */
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

/* All the resources that are «MOVIES» will be identifies with the URL /movies */
app.get(ROUTES.MOVIES, (req, res) => {
  /* In this way you can choose the format of the response. Here, by default, is JSON if nothing is passed. This accomplish the Representation fundamental on REST where is the client who decide which would be the representation of the data they want */

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
  // path-to-regex → Is possible to put regex in the URL but express use this library: path-to-regex
  /*
  - Is possible to use «/movies/:id/:couldBeMore/*:andAsMuchAsYouWant» where the :id, :couldBeMore, :andAsMuchAsYouWant and * are part of the URL separated by an slash. Is your decition using it this way or making them query params
  - Everytime you can, use path-to-regex because make the regex by you can lead into problems
  
  
  To know more check the github repository: https://github.com/pillarjs/path-to-regexp or the express explanation: https://expressjs.com/en/guide/routing.html
  */

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

/* This should always be the same resource, is not like you can put here `app.post("/create-movies", fn)`, this is because the Resource is defined by the URL and is the verb which decide what's going to be done there: GET, POST, other */
app.post(ROUTES.MOVIES, (req, res) => {
  const requestValidated = validateMovie({ objectToValidate: req.body })

  /* You can check here:
  - requestValidated.error for error
  - requestValidated.sucess for success. 
  - When success is true, the error doesn't exist —would be a undefined—. 
  - The data will be on requestValidated.data only when success is true
  */
  if (requestValidated.error) {
    /* You can pass here a 422 instead a 400:
      - The 400 status code is because the client did something to lead on this error: sintaxis error, the data sent was not correct. The important thing here is: the client cannot do a new request without modifications
      - Other approach is 422: the server understood the request, type of content but the sintaxis of the resource was not possible to created because some validation or instruction was not correct. The same as the previous: client will not be able to make another request is it not change something 
      
    Final though, use anything you want
      */
    return res
      .status(400)
      .json({ error: JSON.parse(requestValidated.error.message) })
  }

  /* 
  Avoid this approach because it will be to expensive to validate every field. Use zod instead
  const { title, year, director, duration, poster, genre, rate } = req.body 
  */

  /* From now on, this would not be REST because we are going to save on memory the state of the application. In following classes this would be the call to the database  */
  const newMovie = {
    id: crypto.randomUUID(), // uuid v4
    idToPATCH: Object.keys(allMoviesJSON).length + 1,
    ...requestValidated.data
    /*
    The problem with this approach is:
      - You don't make any validation of the data, the client can send wrong value for every key (a number where should be a string), could send wrong keys ("A" when it should be "B") or could send just another type of data structure (an incomplete object or just a new different thing).
      - We going to validate the data using Zod and Yup (a library that check the data at runtime, Typescript would not solve this problem). Other options could be Valibot
    title,
    year,
    director,
    duration,
    poster,
    genre,
    rate: rate ?? null
    */
  }

  allMoviesJSON.push(newMovie)

  res.status(201).json(newMovie) // You can return the resource created to update the cache of the client
})

/* Take in mind: here we are using «:idToPATCH» instead of «:id» because in this way it will work the file api.http file but in the future, you should use the correct ID created by the crypto.randomUUID() method */
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

/* You can solve the problem of CORS for DELETE here or you can use the native middleware of express on top of this file. The advantage do do it here is you have, natively the path-to-regex library. Above you have to use your own regex or install path-to-regex to use it */
/*
app.options(`${ROUTES.MOVIES}/:id`, (req, res) => {
  const { acceptedOrigin, origin } = originChecked({
    req,
    ACCEPTED_ORIGINS
  })
  if (!acceptedOrigin) {
    return res.status(403).send({ error: "Origin not accepted" })
  }
  res.header("Access-Control-Allow-Origin", origin)
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE")
  res.sendStatus(204)
})
*/

const PORT = process.env.PORT ?? 3000
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})
