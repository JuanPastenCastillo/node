import { createApp } from "../app.js"
import { MovieModel_mysql_INDEX } from "../models/mySQL/MovieModel_mysql_INDEX.js"

createApp({ movieModel: MovieModel_mysql_INDEX })
