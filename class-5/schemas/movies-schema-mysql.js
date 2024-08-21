import z from "zod"
import { KEYS_SQUEMA } from "../utils/models/mySQL/keys.js"

const movieSchema = z.object({
  [KEYS_SQUEMA["title"]]: z.string({
    invalid_type_error: "Movie title must be a string",
    required_error: "Movie title is required"
  }),
  [KEYS_SQUEMA["year"]]: z
    .number({
      invalid_type_error: "Movie year must be a number",
      required_error: "Movie year is required"
    })
    .int()
    .min(1906)
    .max(new Date().getFullYear() + 1),
  [KEYS_SQUEMA["director"]]: z.string({
    invalid_type_error: "Movie director must be a string",
    required_error: "Movie director is required"
  }),
  [KEYS_SQUEMA["duration"]]: z
    .number({
      invalid_type_error: "Movie duration must be a number",
      required_error: "Movie duration is required"
    })
    .int()
    .positive(),
  [KEYS_SQUEMA["poster"]]: z.string().url({
    message: "Poster must be a valid URL"
  }),

  [KEYS_SQUEMA["genre"]]: z
    .enum([
      "action",
      "adventure",
      "animation",
      "biography",
      "crime",
      "drama",
      "fantasy",
      "romance",
      "sci-fi",
      "anime"
    ])
    .array({
      required_error: "Movie genre is required",
      invalid_type_error: "Movie genre must be an array of enum Genre"
    }),
  [KEYS_SQUEMA["rate"]]: z
    .number({
      invalid_type_error: "Movie rate must be a number",
      required_error: "Movie rate is required"
    })
    .min(0)
    .max(10)
    .nullable()
    .default(null),
  [KEYS_SQUEMA["oscar"]]: z.boolean().nullable().default(null),
  [KEYS_SQUEMA["basedonbook"]]: z.boolean().nullable().default(null),
  [KEYS_SQUEMA["overwrite"]]: z.boolean().nullable().default(null)
})

export const validateMovie = ({ objectToValidate }) => {
  return movieSchema.safeParse(objectToValidate)
}

export const validatePartialMovies = ({ objectToValidate }) => {
  return movieSchema.partial().safeParse(objectToValidate)
}
