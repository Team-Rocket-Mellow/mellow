type onMessage = (event:MessageEvent) => void

class WSClient {
   ws:WebSocket|null
   server:string
   onMessage: onMessage
   #backoff:number

   constructor(onMessage:onMessage, server="localhost") {
      this.server = server
      this.onMessage = onMessage
   }

   connect() {
      const ws = new WebSocket(this.server)
      ws.onopen = () => {
         console.log(`WebSocket connection: ${this.server}.`)
         this.ws = ws
      }
      ws.onclose = ({ code, reason, wasClean }) => {
         console.log(`WebSocket connection closed.`)
         console.log(`Code: ${code}.`)
         console.log(`Reason: ${reason}.`)
         this.ws = null
         if (!wasClean) {
            console.log(`WebSocket terminatedly poorly. Reconnecting soon.`)
            setTimeout(() => this.connect(), 3000)
         }
      }
      ws.onerror = (error) => {
         console.log("WebSocket error :", error)
         console.log(`Reconnecting in ${this.#backoff}`)
         setTimeout(() => this.connect(), 3000)
      }
      ws.onmessage = this.onMessage
   }

   close(reason, code=1000) {
      if (this.ws === null) {
         console.log("WebSocket connection is null.")
         return
      }
      switch (this.ws.readyState) {
         case WebSocket.OPEN:
            console.log("WebSocket closing.")
            console.log(`Code: ${code}.`)
            console.log(`Reason: ${reason}.`)
            this.ws.close(code, reason)
            this.ws = null
            break
         case WebSocket.CLOSING:
         case WebSocket.CLOSED:
         case WebSocket.CONNECTING:
            console.log(`WebSocket cannot close. WebSocket state: ${this.ws.readyState}.`)
      }
   }

   send(msg:string) {
      if (this.ws?.readyState === WebSocket.OPEN) {
         this.ws.send(msg)
      }
   }
}

export default WSClient