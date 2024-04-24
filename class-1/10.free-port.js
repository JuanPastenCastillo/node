/* node 10.free-port.js */

const net = require("node:net")

const findAvailablePort = (desiredPort) => {
  return new Promise((resolve, reject) => {
    const server = net.createServer()

    server.listen(desiredPort, () => {
      const { port } = server.address()
      server.close(() => {
        resolve(port)
      })
    })

    server.on("error", (error) => {
      if (error.code === "EADDRINUSE") {
        /* The port number 0 is for development, not for production. On production you will want to use the port 80 always available */
        findAvailablePort(0).then((port) => resolve(port))
      } else {
        reject(error)
      }
    })
  })
}

module.exports = { findAvailablePort }
