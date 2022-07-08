// —————————————————————————————————————————————————————————————————————————————
// Environment

type onMessage = (event:MessageEvent) => void

const { log } = console

// —————————————————————————————————————————————————————————————————————————————
// Types

type State =  "OPENING" | "OPEN" | "CLOSING" | "CLOSED"

// —————————————————————————————————————————————————————————————————————————————
// WebSocket Client

class WebSocketClient {
   ws:WebSocket|null = null
   server:string
   onMessage:onMessage
   #backoff = 1000

   constructor(onMessage:onMessage, server="ws://localhost") {
      this.server = server
      this.onMessage = onMessage
   }

   get backOff() {
      return (this.#backoff < 32_000 ? this.#backoff *= 2 : this.#backoff) + Math.floor(Math.random() * 3000)
   }

   /** Attempts WebSocket connection. */
   connect() {
      const ws = new WebSocket(this.server)
      ws.onopen = () => {
         log(`WebSocket connection: ${this.server}.`)
         this.ws = ws
         this.#backoff = 1000
      }
      ws.onclose = ({ code, reason, wasClean }) => {
         log(`WebSocket connection closed. Code: ${code}. Reason: ${reason}.`)
         this.ws = null
         if (!wasClean) {
            const delay = this.backOff
            log(`Reconnecting in ${delay} ms.`)
            setTimeout(() => this.connect(), delay)
         }
      }
      ws.onerror = (error) => {
         log("WebSocket error :", error)
      }
      ws.onmessage = this.onMessage
   }

   /** Closes WebSocket connection if exists. */
   close(reason:string, code=1000) {
      if (this.ws === null) {
         log("WebSocket connection is null.")
         return
      }
      switch (this.ws.readyState) {
         case WebSocket.OPEN:
            log(`WebSocket connection closed. Code: ${code}. Reason: ${reason}.`)
            this.ws.close(code, reason)
            this.ws = null
            return
         case WebSocket.CLOSING:
         case WebSocket.CLOSED:
            log(`WebSocket already closing or closed. WebSocket state: ${this.ws.readyState}.`)
            return
         case WebSocket.CONNECTING:
            function delayedClose() {
               this.ws!.removeEventListener("open", delayedClose)
               this.close("Fulfilling delayed WebSocket close request.", 1000)
            }
            this.ws.addEventListener("open", delayedClose)
            return
      }
   }

   send(msg:string) {
      if (this.ws?.readyState !== WebSocket.OPEN) {
         log("WebSocket is not open.")
         return
      }
      this.ws.send(msg)
   }
}

export default WebSocketClient