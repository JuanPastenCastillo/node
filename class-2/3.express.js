/* node --watch class-2/3.express.js */

/* 
  When you use express it add some header call X-Powered-By with the value of "Express". This could lead to security problems because everyone can know te technology you are using and try to exploit vulnerabilities there. is recommended to disable this with «app.disable("x-powered-by")»
*/
const express = require("express")
const dittoJSON = require("./data/pokemon/ditto.json")

const PORT = process.env.PORT ?? 3000

/* 
One of the magic thing of express is the use of middleware. This can be used to extract cookies, validate if the user is logged, extract the data from json or any type of logic. Is something previous to to do before it arraive to the request. When it's done it call the «next()» method to continue

The middleware is executed between the request and the response
*/
const app = express()
app.disable("x-powered-by")

/* 
You can decide to which request the middleware will affect. For example:
- app.use("/pokemon/*", fn) → All the requests that start with "/pokemon/*" will be affected
- app.use("/", fn) → Only the request on home will be affected
- app.use(fn) → All the routes will be affected. This is the usual behavior

The middleware can be used also for specific methods: only for GET, only for POST

Caveats 🟨:
- You shouldn't forget the final «next()» method because if you forget it will wait infinitely for the next request
- A middleware can be used at first, in between or at last. The concept of this is "be in the middle" but technically the «app.use()» can be used as a middleware anywhere. Is like a proxy, intercep the request to respond it later. A proxy and a middleware intercep a request but the final goal is different: the Proxy will have the responsibility of orchestration but the Middleware will do that and apply some logic or task into it. A Middleware could reject a request
*/

/* The line below is the equivalent all the code starting on line 33. The only thing you should add is the time that can be add on the post route itself, see the comment on line 91 to see the example for the date and other data */
// app.use(express.json())
app.use((req, res, next) => {
  /* console.log("My first middleware") */
  /* Track the request to database  */
  /* Check if the user have cookies */

  if (req.method !== "POST") return next()
  if (req.headers["content-type"] !== "application/json") return next()

  /*
  Now, here only will get POST method with header "content-type: application/json"
  */

  let body = ""
  req.on("data", (chunk) => {
    body += chunk.toString()
  })

  req.on("end", () => {
    const data = JSON.parse(body)

    data.timestamp = Date.now()
    // res.status(201).json(data) // Is not possible to do this here, what we are going to do instead is mutate the request and add the data into req.body
    req.body = data
    next()
  })
})

/* Express allow you to use the route first and the callback after */
app.get("/pokemon/ditto", (req, res) => {
  /*
  res.send(
    "<h1>Hello World: express baby! Weird characters work?  áeíóúñ åÅøØæÆ ýþæö</h1>"
  )
  */
  /*
  res.send(
    "Hello World: express baby! Weird characters work?  áeíóúñ åÅøØæÆ ýþæö"
  )
  */

  /*
  res.json({
    message:
      "Hello World: express baby! Weird characters work?  áeíóúñ åÅøØæÆ ýþæö"
  })
  */

  res.json(dittoJSON)
})

/* In the post, everything is the same as nodejs */
app.post("/pokemon", (req, res) => {
  /* 
  - The data that comes from the req.body was assigned on the Middleware above 
  - Here is the moment to save on DB
  */

  /*
  req.body.timestamp = Date.now()
  req.body.in_built = "done"
  */

  res.status(201).json(req.body)
})

/* 
- In express the «.use» is like using a «*», this mean: if is using GET, POST or anything it will lead here
- This is order dependent, this should be declared at the end to make the last method to evaluate
 */
app.use((req, res) => {
  let { url } = req
  res.status(404).send(`Route "${url}" Not found ▬ 404`)
})

/* This api is the same as nodejs */
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})
