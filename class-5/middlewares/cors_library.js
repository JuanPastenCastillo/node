import cors from "cors"

const ACCEPTED_ORIGINS = [
  "http://localhost:8080",
  "http://localhost:3000",
  "https://movies.com", // This could be the production
  "https://juanpastencastillo.com"
]

export const corsMiddleware_L = ({
  acceptedOriginsProp = ACCEPTED_ORIGINS
} = {}) =>
  cors({
    origin: (origin, callback) => {
      if (acceptedOriginsProp.includes(origin) || !origin) {
        return callback(null, true)
      }

      return callback(new Error("Not allowed by CORS"))
    }
  })
