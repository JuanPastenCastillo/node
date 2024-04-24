/* node 9.http.js */

const http = require("node:http")

/* A server can do only two things: listen and respond */
const server = http.createServer((req, res) => {
  // console.log("res:", res)
  res.end("Hello World")
})

/* This is for development, not for production. On production you will want to use the port 80 always available */
server.listen(0, () => {
  console.log(
    `Server listening on port http://localhost:${server.address().port}`
  )
})
