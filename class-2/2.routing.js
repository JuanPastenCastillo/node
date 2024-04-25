/*  */

/* In commonJS you can import json data directly  and use it */
const dittoJSON = require("./data/pokemon/ditto.json")
const http = require("node:http")

/* 
Methods of routing:

- GET: To get data
- HEAD: Is exactly the same as get but without the responding of the body. Is usually used to know if the user have permission to access to some content
- POST: To create data
- PUT: To update data, this replace the content
- PATCH: To modifiy partially some data
- DELETE: To delete data
- OPTIONS: This is used to know which communication are available for the target resource. This is usually the problem we have on CORS on browser. The browser make a request to a server and this server send a response with the type of comunication allowed. The OPTION return the headers CORS

Caveats 🟨:
- There's some discusión about the use of POST versus PATCH. Search it
*/
const processRequest = (req, res) => {
  const { method, url } = req

  switch (method) {
    case "GET":
      switch (url) {
        case "/pokemon/ditto":
          res.setHeader("Content-Type", "application/json; charset=utf-8")
          return res.end(JSON.stringify(dittoJSON)) // return or break
        default:
          res.statusCode = 404
          res.setHeader("Content-Type", "text/html; charset=utf-8")
          return res.end("<h1>Not found: 404</h1>") // return or break
      }

    case "POST":
      switch (url) {
        case "/pokemon": {
          let body = ""
          /* Hear the event data */
          req.on("data", (chunk) => {
            body += chunk.toString()
          })

          req.on("end", () => {
            const data = JSON.parse(body)
            /* Here we could call to a database to save the data or other thing */
            res.writeHead(201, {
              "Content-Type": "application/json; charset=utf-8"
            })
            data.timestamp = Date.now()
            res.end(JSON.stringify(data))
          })

          break
        }
        default:
          res.statusCode = 404
          res.setHeader("Content-Type", "text/plain; charset=utf-8")
          return res.end("Not found: 404")
      }
  }
}

const server = http.createServer(processRequest)

server.listen(3000, () => {
  console.log(`Server listening on port http://localhost:${3000}`)
})
