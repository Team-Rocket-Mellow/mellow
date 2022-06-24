import WebSocket from "ws"
import { nanoid } from "nanoid"
import SyncSet from "./crdt"

// —————————————————————————————————————————————————————————————————————————————
// Websocket Server

const server = new WebSocket.Server({ port: 8080 })
const clients = new Map()
const set = new SyncSet()

server.on("connection", connectionHandler)

function connectionHandler(ws:WebSocket) {
   const id = nanoid(36)
   clients.set(id, ws)

   ws.on("message", (message:string) => {
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

// —————————————————————————————————————————————————————————————————————————————
// Types

type Peers = { [username:string]: string }
type Clock = { [id:string]: number }

type Action = {
   type  : "ADD" | "REMOVE"
   clock : Clock
   id    : string
}

type Initial = {
   type  : "INITIAL"
   clock : Clock
   id    : string
}

type Message = Initial | Action

/**

1. User registration means a row entry in the database.

 */