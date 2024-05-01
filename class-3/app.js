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
  - Methods: what kind of action you want to do with the resource. This could be GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS and so on. The most common actions made here are the "CRUD" → Create (POST), Read (GET), Update (PUT or PATCH), Delete (DELETE)
  - Representation: This is how the resource is represented: the most common representation is JSON but is not mandatory, this could be also XML, HTML, CSV, etc. The client decide which representation be the resource, having none restriction on the format. One client can ask for a JSON while other client can ask for a XML representation
  - Stateless: every request to the server should contain all the neccesary data to understand that request. This mean the server should not be able to remember anything about the request. For example it cannot save how many calls have been made to the server, it have to make pagination or not, that data should be always on the URL of the request. Sometimes some data can be save to help the client but in that case the REST architecture will be break. Another case is when we have some database on the backend.
  - Unified interfaz: this is difficul to break it but it means that the interfaz between client and server should be consistent for every interaction. The URLs should always do the same, should always be called the same
  - Separation of concepts: components of client and server should be separated. This allow the server and the client evolve independently

Caveat 🟨:
  - Sometimes you can make some API that is not REST, another architecture exist (like SOAP or GraphQL
  ). Some people think that an API that return a JSON is immediately a REST API but it is not always the case.
*/

const express = require("express")
const allMoviesJSON = require("./data/movies.json")
const { formatResponse } = require("./formatResponse")
const { moviesQueryParams } = require("./moviesQueryParams")

const app = express()
app.disable("x-powered-by")

/* An endpoint of a path (some URL) where you have some resource to extract data*/
app.get("/", (req, res) => {
  res.json({ message: "This is the endpoint for home" })
})

app.use((req, res, next) => {
  if (req.method === "GET" && req.url.startsWith("/movies")) {
    const { format = "json" } = req.query

    if (format.toLowerCase() === "json") {
      req._format = "json"

      return next()
    } else {
      req._format = format.toLowerCase()
      return next()
    }
  }
})

/* All the resources that are «MOVIES» will be identifies with the URL /movies */
app.get("/movies", (req, res) => {
  /* In this way you can choose the format of the response. Here, by default, is JSON if nothing is passed. This accomplish the Representation fundamental on REST where is the client who decide which would be the representation of the data they want */

  if (Object.keys(req.query).length !== 0) {
    const getQueryParams = moviesQueryParams({
      allQueries: req.query,
      dataToFilter: allMoviesJSON
    })

    formatResponse({
      _actualFormat: req._format,
      theResMethod: res,
      theResBody: getQueryParams
    })
  } else {
    formatResponse({
      _actualFormat: req._format,
      theResMethod: res,
      theResBody: allMoviesJSON
    })
  }
})

app.get("/movies/:id", (req, res) => {
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

const PORT = process.env.PORT ?? 3000
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})

/* 
!FH0
CHALLENGE:
- Add pagination. I think is is donde adding just a key to the resource that say which page is: like the first page is 1, the second page is 2, etc. And with that retrieve the ammount of data you want based on their possition
*/
