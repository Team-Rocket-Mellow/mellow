import WebSocket from "ws"
import { nanoid } from "nanoid"

const server = new WebSocket.Server({ port: 2049 })
const clients = new Map()

server.on(
   "connection",
   (ws: WebSocket) => {
      const id = nanoid(36)
      clients.set(id, ws)
      ws.on("message", (message: string) => {
         const data = JSON.parse(message)
         console.log(data)
         clients.forEach((client) => {
            client.send(message)
         })
      })
      ws.on("close", () => {
         clients.delete(id)
      })
   }
)