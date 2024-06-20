import { originChecked } from "../utils/originChecked.js"
import { toJSON } from "../utils/toJSON.js"

const ACCEPTED_ORIGINS = [
  "http://localhost:8080",
  "http://localhost:3000",
  "https://movies.com", // This could be the production
  "https://juanpastencastillo.com"
]

export const corsMiddleware_M = (
  { req, res, next },
  { routes },
  { acceptedOriginProp = ACCEPTED_ORIGINS } = {}
) => {
  if (req.url.startsWith(routes.MOVIES)) {
    if (req.method === "GET") {
      const { acceptedOrigin, origin } = originChecked({
        req,
        acceptedOriginProp
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
      const { acceptedOrigin, origin } = originChecked({
        req,
        acceptedOriginProp
      })

      if (!acceptedOrigin) {
        return res.status(403).send({ error: "Origin not accepted" })
      }

      res.header("Access-Control-Allow-Origin", origin)

      return next()
    } else if (req.method === "OPTIONS") {
      const { acceptedOrigin, origin } = originChecked({
        req,
        acceptedOriginProp
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
}
