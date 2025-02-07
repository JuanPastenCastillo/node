import crypto from "node:crypto"

import bcrypt from "bcrypt"
import DBLocal from "db-local"

import { SALT_ROUNDS } from "./config.js"

const { Schema } = new DBLocal({ path: "./db" })

const User = Schema("User", {
  _id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true }
})

export class UserRepository {
  /* If in the future this local databse is changed by another Database the contract should remain the same. Now, how you will know that the contract remain the same? Because the enter paremeters and the output will be the same. With that, you respect the contract */
  static async create({ username, password }) {
    /* 1 Step: validate the entry data: username and password in this case. Optional: use zod or other */
    Validation.username(username)
    Validation.password(password)

    /* 2 Step: the username should not exist in the database. Here you have two strategies:
      A: Leat the error happen in your database and catch the error in the source code
      B: You can check, in the source code, if the user exists first before creating the user on the database
    The use of the strategy A or B will depend on the database you are using. From midudev, he prefer the strategy B
    */
    /* Example of strategy B*/
    const user = User.findOne({ username })
    if (user) throw Error("User already exists")

    /* 3 Step: Create the id for the database. 
    
    - Unless you want a very specific ID do not install a third party library. Sometimes, the database generate the ID, if this is the case the better and use it. MongoDB and mySQL for example generate the ID. 
    
    - There's a discusion that say the "randomUUID()" is bad for indexing on databse and that's true for some cases, specially when you have a lot of information there. This depend on every database, you should make your research to know if is a good idea or not for that database for your particular case. One strategy is to have a public ID for better indexation, but that's something for another moment. Is not a good idea to make and incremental ID because with that it will be easy to attack you
    
    The "randomUUID()" can repeat ID? Yes, but the probability is too low
    */
    const id = crypto.randomUUID()

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

    User.create({
      _id: id,
      username,
      password: hashedPassword
    }).save()

    return { id }
  }

  static async login({ username, password }) {
    Validation.username(username)
    Validation.password(password)

    const user = User.findOne({ username })
    if (!user) throw Error("User not found")

    const isValid = await bcrypt.compare(password, user.password) // The function `bcrypt.compare(arg1, arg2)` return a boolean
    if (!isValid) throw Error("Invalid password")

    /* Implicit approach: we decide which data we DON'T WANT to return to the client */
    const { password: _, ...publicUser } = user

    /* Explicit apporach:, we decide whicch data data we WANT to return to the client ↓ next line ↓
    return { user: user.username }
    */
    return { user: publicUser }
  }
}

class Validation {
  static username(username) {
    if (typeof username !== "string") throw Error("username must be a string")
    if (username.length < 3) throw Error("username must be at least 3 characters long")
  }

  static password(password) {
    if (typeof password !== "string") throw Error("password must be a string")
    if (password.length < 6) throw Error("password must be at least 6 characters long")
  }
}
