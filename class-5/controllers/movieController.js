import {
  validateMovie,
  validatePartialMovies
} from "../schemas/movies-schema-mysql.js"
import { formatResponse } from "../utils/formatResponse.js"

export class MovieController {
  /* 
    In this way, you make some class be able to receive some parameters. Explanation:
      + `constructor`: This is a special method in a class that is called when a new instance of the class is created. It is used to initialize the object’s properties.
      + `this.movieModel`: This is an instance property of the MovieController class. It will hold the value of movieModel for the specific instance of the class.
      + movieModel: This is the parameter that was passed to the constructor, extracted from the object during destructuring. It represents a model (likely a database model) that will be used for operations related to movies.
      + this.movieModel = movieModel: This line assigns the value of the movieModel parameter to the instance property this.movieModel. This allows the class instance to use the movieModel throughout its methods.
  */
  constructor({ movieModel }) {
    this.movieModel = movieModel
  }

  getAll = async (req, res) => {
    const dataFiltered = await this.movieModel.getAll({
      allQueries: req.query
    })

    formatResponse({
      _actualFormat: req._format,
      theResMethod: res,
      theResBody: dataFiltered
    })
  }

  getById = async (req, res) => {
    const { id } = req.params

    const movieFound = await this.movieModel.getById({ id })

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

  post = async (req, res) => {
    const requestValidated = validateMovie({ objectToValidate: req.body })

    if (requestValidated.error) {
      return res
        .status(400)
        .json({ error: JSON.parse(requestValidated.error.message) })
    }

    const newMovie = await this.movieModel.post({
      input: requestValidated.data
    })

    if (newMovie?.errorMessage) {
      return res.status(400).json({ error: newMovie.errorMessage })
    }

    res.status(201).json(newMovie)
  }

  patch = async (req, res) => {
    const requestValidated = validatePartialMovies({
      objectToValidate: req.body
    })

    if (requestValidated.error) {
      return res
        .status(400)
        .json({ error: JSON.parse(requestValidated.error.message) })
    }

    const { overwrite = false } = req.body

    const idFromUser = req.params.id
    const { updatedMovie, updatedGenres, connection } =
      await this.movieModel.patchPut({
        id: idFromUser,
        input: requestValidated.data,
        isPut: overwrite
      })

    if (
      (updatedMovie === null || updatedMovie === undefined) &&
      (updatedGenres === null || updatedGenres === undefined)
    ) {
      if (connection) {
        await connection.rollback()
      }

      return res.status(404).json({
        message: `Error with id «${idFromUser}»`,
        updatedMovie,
        updatedGenres
      })
    }

    await connection.commit()

    return res.status(200)
  }

  delete = async (req, res) => {
    const { id } = req.params
    const { data, errorMessage } = await this.movieModel.delete({ id })

    if (errorMessage) {
      return res
        .status(404)
        .json({ message: `Movie not found with id «${id}»` })
    }

    return res.json({ message: `Movie deleted with id «${id}»` })
  }
}
