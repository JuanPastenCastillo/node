/* node 9.http.js */

const http = require("node:http")
const { findAvailablePort } = require("./10.free-port.js")

/* The files «.env» is a dependency not something native from Node. If you are using a Framework you can use it making it more easy 
- A suggestion: found alternatives to «.env»
*/
const desiredPort = process.env.PORT ?? 3000

/* A server can do only two things: listen and respond */
const server = http.createServer((req, res) => {
  // console.log("res:", res)
  res.end("Hello World")
})

findAvailablePort(desiredPort).then((port) => {
  server.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`)
  })
})
