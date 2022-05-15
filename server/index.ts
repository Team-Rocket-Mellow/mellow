// —————————————————————————————————————————————————————————————————————————————
// Imports

import path, { dirname } from "path"
import { fileURLToPath } from "url"
import { fastify } from 'fastify'
import { fastifyStatic } from "@fastify/static"

// —————————————————————————————————————————————————————————————————————————————
// Configuration

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const host = "0.0.0.0"
const port = 8080
const app = fastify({
  logger: true,
})

const root = path.join(__dirname, "..", "dist")
app.register(fastifyStatic, { root })

// —————————————————————————————————————————————————————————————————————————————
// Serve

const start = async () => {
   try {
     await app.listen({
       host,
       port,
     })
   }
   catch (err) {
     app.log.error(err)
     process.exit(1)
   }
 }
 
 start()