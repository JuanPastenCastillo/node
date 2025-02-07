import cookieParser from "cookie-parser"
import express from "express"
import jwt from "jsonwebtoken"
import { PORT, SECRET_JWT_KEY } from "./config.js"
import { UserRepository } from "./user-repository.js"

const app = express()

app.set("view engine", "ejs")

app.use(express.json())
app.use(cookieParser())
app.use((req, res, next) => {
  const token = req.cookies.access_token_by_developer

  req.session_by_developer = { user: null }

  try {
    const data = jwt.verify(token, SECRET_JWT_KEY)
    req.session_by_developer.user = data
  } catch {}

  next() // with this function the next route or middleware is called
})

app.get("/", (req, res) => {
  const { user } = req.session_by_developer
  res.render("index", user)
})

app.post("/login", async (req, res) => {
  const { username, password } = req.body

  try {
    const { user } = await UserRepository.login({ username, password })
    const token = jwt.sign({ id: user._id, username: user.username }, SECRET_JWT_KEY, {
      expiresIn: "1h"
    })

    /* The "refreshToken" should be saved on a cookie also but the acccess token would be used in a different way but the primary thing is: you have two tokens, the first one is the access token which have a very brief lifetime and the second one is the refresh token which have a longer lifetime. The refresh token is used to refresh the access token. This is a common approach to avoid the token expiration problem. Meanwhile the user use the web, we create new access token to never expire. And the refresh token is used by the client primary without send it to any place. Basically the refresh token is used to create new access tokens.
    
    The refresh token can be re created by a number of uses or after certain time or ask to the user to sign in again. Other thing is make a psuedo-sign-in
    
    */
    const refreshToken = jwt.sign({ id: user._id, username: user.username }, SECRET_JWT_KEY, {
      expiresIn: "7d"
    })

    res
      .cookie("access_token_by_developer", token, {
        // With this approach you are going to make this on the server and the client is going to have it being able to use it whatever they want
        // In general, the name "access_token_by_developer" is ccall just "access_token", here is using this name to be crystal clear that this comes from the developer
        httpOnly: true, //cookie can be accessed only in the server.
        secure: process.env.NODE_ENV === "production", //cookie can only be sent over HTTPS
        sameSite: "strict", //cookie can only be accessed by the same domain
        maxAge: 1000 * 60 * 60 //cookie have a validation of 1 hour
      })
      .send({ username: user.username, token: user._id })
  } catch (error) {
    res.status(400).send(error.message)
  }
})

app.post("/register", async (req, res) => {
  /* 
  If the req.body is evaluated to undefined, it should be handled by the server/backend to not return all the error to the client/fronted
  */
  const { username, password } = req.body

  try {
    const { id } = await UserRepository.create({ username, password })
    res.send({ id })
  } catch (error) {
    /* Normally, is not a good idea to send the error of the repository. The problem is to return an error data with too much information on it, like the database data, the table, code, number of where the error is. What you can do is to check which was the error, like the approach `A` */
    /* `A` approach
    if (error.message.includes("User already exists")) { }
    
    To know more, check the video from Midudev about the errors: https://youtu.be/OhE-mEt37iA → «¡Maneja los errores de JavaScript como un senior!»
    */
    res.status(400).send(error.message)
  }
})

app.post("/logout", (req, res) => {
  res.clearCookie("access_token_by_developer").json({ message: "Logged out" })
})

app.get("/protected", (req, res) => {
  /* if user is login, enter. Posible solutions:
  - express-session npm package
  - redis database
  - inside the local database with data about the session: the _id, username, expires and everytime the user make login create this
  
  The main problem of the session is the "state": we need to save that data somewhere, in someplace and verify the user have access, the session is valid in time, the user have not close session (the session still exist); second problem is the session can be easily stoled
  
  The answer to: "is the user still loged?" is the definition of session. Solve this problem with a state will be too complicated. Here's where the Jason Web Token (JWT) comes in 
  */
  // res.render("protected", { username: "Hard Coded Fallback" })
  /* Without a fallback data or a proper data this page should return an error */

  const { user } = req.session_by_developer

  if (!user) return res.status(403).send("Access not authorized")

  res.render("protected", user)
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
