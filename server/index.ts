// —————————————————————————————————————————————————————————————————————————————
// Imports

import path, { dirname } from "path"
import { fileURLToPath } from "url"
import { fastify } from 'fastify'
import fastifyStatic from "@fastify/static"
import websocket from "@fastify/static"

// —————————————————————————————————————————————————————————————————————————————
// Configuration

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const host = "0.0.0.0"
const port = 8080
const app = fastify({ logger: true, })

const root = path.join(__dirname, "..", "dist")

app.register(fastifyStatic, { root })
app.register(websocket)
app.register(fastify_ws)

// —————————————————————————————————————————————————————————————————————————————
// Websocket

async function fastify_ws(app) {
   app.get("/ws", { websocket: true }, handle_ws)
}

async function handle_ws(connection, request) {
   connection.socket.on("message", message => {
      console.log(JSON.parse(message))
      connection.socket.send("Hello: " + message)
   })
}

// —————————————————————————————————————————————————————————————————————————————
// Serve

async function start() {
   try {
      await app.listen({ host, port, })
   }
   catch (err) {
      console.log("Fastify server failed to start.")
      app.log.error(err)
      process.exit(1)
   }
}

start()