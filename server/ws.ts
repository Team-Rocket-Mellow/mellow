import WebSocket, { WebSocketServer } from "ws"

const server = new WebSocketServer({ port: 8080, })

function connectionHandler(ws:WebSocket) {
   ws.on("message", (message:string) => {
      console.log(message)
   })
}

server.on("connection", connectionHandler)