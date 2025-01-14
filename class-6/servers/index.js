import { createClient } from "@libsql/client"
import express from "express"
import logger from "morgan"
import path from "path"

import { createServer } from "node:http"
import { Server } from "socket.io"

const app = express()
const server = createServer(app)
const io = new Server(server, {
  connectionStateRecovery: {}
})

const { DB_URL, DB_TOKEN } = process.env

const db = createClient({
  url: DB_URL,
  authToken: DB_TOKEN
})

await db.execute(/*sql*/ `
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT,
    username TEXT
  )`)

io.on("connection", async (socket) => {
  console.log("user has connected 🔰🔰")

  socket.on("disconnect", () => {
    console.log("User disconected")
  })

  socket.on("chat message", async (msg) => {
    console.log("Get message:", msg)
    let result
    const theUser = socket.handshake.auth.username ?? "anonymous"
    try {
      result = await db.execute({
        sql: `INSERT INTO messages (content, username) VALUES (:msg, :theUser)`,
        args: { msg, theUser } // this can be an array also, but an object is more readable
        /* Another way to write it
        sql: "INSERT INTO messages (content) VALUES (:content)",
        args: { content: msg }
        */
      })
    } catch (error) {
      console.error("error:", error)
      return
    }

    /* As you can see, you can provide as many arguments you need on "io.emit". The idea now is refactor this to pass only an object */
    io.emit("chat message", msg, result.lastInsertRowid.toString(), theUser)
  })

  console.log(
    "messages sent from the client to the server:",
    socket.handshake.auth
  )

  if (socket.recovered) {
    console.log("recovered success! ✅, SERVER")
  } else {
    console.log("recovered fail! ❌, SERVER")
    try {
      const results = await db.execute({
        sql: `SELECT id, content, username FROM messages where id > (:theID)`,
        args: { theID: socket.handshake.auth.theServerOffset ?? 0 }
      })

      const [key1, key2] = results.columns // You can get the columns ID
      const [type1, type2] = results.columnTypes // You can get the columns type

      results.rows.forEach((xRow) => {
        socket.emit(
          "chat message",
          xRow.content,
          xRow.id.toString(),
          xRow.username
        )
      })
    } catch (error) {
      console.log(error)
      return
    }
  }
})

app.use(logger("dev"))

app.get("/", (req, res) => {
  const pathToIndexHTML = path.join(process.cwd(), "client", "index.html")

  res.sendFile(pathToIndexHTML)
})

const PORT = process.env.EXACT_PORT || 0

server.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})
