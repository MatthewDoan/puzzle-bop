import { createServer } from "http"
import express from "express"
import socketIo from "socket.io"

const app = express()
const server = createServer(app)
const io = socketIo(server)

app.get("/", (req, res) => {
  res.send("Hello World!")
})

io.on("connection", socket => {
  console.log("A user connected")
})

const PORT = 80
server.listen(PORT, () => {
  console.log(`Puzzle Bop server started listening on port ${PORT}.`)
})
