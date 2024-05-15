import { MovieModel, QUERY_KEYS } from "../models/movie.js"
import { validateMovie, validatePartialMovies } from "../schemas/movies.js"
import { formatResponse } from "../utils/formatResponse.js"

export class MovieController {
  static getAll = async (req, res) => {
    const dataFiltered = await MovieModel.getAll({
      allQueries: req.query
    })

    formatResponse({
      _actualFormat: req._format,
      theResMethod: res,
      theResBody: dataFiltered
    })
  }

  static getById = async (req, res) => {
    const { id } = req.params

    if (id.toLowerCase() === "keys") {
      return res.status(200).send({ keys: QUERY_KEYS })
    }

    const movieFound = await MovieModel.getById({ id })

    if (!movieFound) {
      return res
        .status(404)
        .send({ message: `Movie not found with id «${id}»` })
    } else {
      formatResponse({
        _actualFormat: req._format,
        theResMethod: res,
        theResBody: movieFound
      })
    }
  }

  static create = async (req, res) => {
    const requestValidated = validateMovie({ objectToValidate: req.body })

    if (requestValidated.error) {
      return res
        .status(400)
        .json({ error: JSON.parse(requestValidated.error.message) })
    }

    const newMovie = await MovieModel.create({ input: requestValidated.data })

    res.status(201).json(newMovie)
  }

  static patch = async (req, res) => {
    const requestValidated = validatePartialMovies({
      objectToValidate: req.body
    })

    if (requestValidated.error) {
      return res
        .status(400)
        .json({ error: JSON.parse(requestValidated.error.message) })
    }

    console.log("req.params:", req.params)
    const { idToPATCH } = req.params
    const { status, updatedMovie } = await MovieModel.patch({
      id: idToPATCH,
      input: requestValidated.data
    })
    console.log("status, updatedMovie:", status, updatedMovie)

    if (!status) {
      return res
        .status(404)
        .json({ message: `Movie not found with id «${idToPATCH}»` })
    }

    return res.json(updatedMovie)
  }

  static delete = async (req, res) => {
    const { id } = req.params
    const movieIndex = await MovieModel.delete({ id })

    if (!movieIndex) {
      return res
        .status(404)
        .json({ message: `Movie not found with id «${id}»` })
    }

    return res.json({ message: `Movie deleted with id «${id}»` })
  }
}
