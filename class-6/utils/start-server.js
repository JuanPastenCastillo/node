const PORT_RANGE = {
  min: Number(process.env.PORT_RANGE_MIN),
  max: Number(process.env.PORT_RANGE_MAX),
  default: 0
}

const MAX_ATTEMPTS = 5

function getRandomPort(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function startServer({
  attempt = 1,
  maxAttempts = MAX_ATTEMPTS,
  minRange = PORT_RANGE.min,
  maxRange = PORT_RANGE.max,
  explicitPort = process.env.EXACT_PORT || null,
  customRoute = process.env.INITIAL_ROUTE || null,
  defaultPort = PORT_RANGE.default,
  prevPort = null
} = {}) {
  const port =
    (attempt === 1 && explicitPort) ||
    (attempt <= maxAttempts ? getRandomPort(minRange, maxRange) : defaultPort) // Use 0 on the 6th try

  console.log(`🚀 Attempt ${attempt}: Trying port ${port}...`) // Log attempts

  server.listen(port, () => {
    if (
      Number(port) === Number(prevPort) ||
      (Number(prevPort) === 0 && attempt === 1)
    ) {
      const thePort = `http://localhost:${server.address().port}`
      console.log("✨Attempt:", attempt, `Server listening on port ${thePort}`)

      const customRouteProvided = customRoute ? customRoute : ""

      const startBrowserCommand = {
        win32: "start",
        darwin: "open",
        linux: "xdg-open"
      }

      exec(
        `${
          startBrowserCommand[process.platform]
        } ${thePort}/${customRouteProvided}`,
        (err) => {
          if (err) {
            console.error(`Failed to open browser: ${err}`)
          }
        }
      )
    }
  })

  server.once("error", (err) => {
    if (err.code === "EADDRINUSE" && attempt <= maxAttempts) {
      prevPort = port

      console.warn(
        `Port ${port} is in use. Retrying (${attempt}/${maxAttempts})...`
      )

      startServer({ attempt: attempt + 1, prevPort })
    } else {
      console.error(`Failed to start server: ${err.message}`)
      process.exit(1)
    }
  })
}

startServer()
