/* node --watch class-4/app.js */

import express from "express"
import { corsMiddleware_M } from "./middlewares/cors_manual.js"
import { homeRouter } from "./routes/home.js"
import { moviesRouter } from "./routes/movies.js"

const app = express()
app.disable("x-powered-by")

const ROUTES = {
  MOVIES: "/movies",
  HOME: "/"
}

app.use(ROUTES.HOME, homeRouter)

app.use((req, res, next) =>
  corsMiddleware_M({ req, res, next }, { routes: ROUTES })
)

app.use(ROUTES.MOVIES, moviesRouter)

const PORT = process.env.PORT ?? 3000
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})
