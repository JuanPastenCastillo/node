import express from "express"
import { corsMiddleware_M } from "./middlewares/cors_manual.js"
import { homeRouter } from "./routes/home.js"
import { createMovieRouter } from "./routes/moviesRouter.js"

export const createApp = ({ movieModel }) => {
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

  app.use(ROUTES.MOVIES, createMovieRouter({ movieModel }))

  const PORT = process.env.PORT ?? 3000
  app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`)
  })
}
