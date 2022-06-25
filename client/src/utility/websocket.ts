import SyncSet from "../../../crdt/set"

// —————————————————————————————————————————————————————————————————————————————
// Types

type Peers = { [username:string]: string }
type Clock = { [id:string]: number }

// -----------------------------------------------------------------------------
// Actions

type Action = Add | Remove | Initial

type Remove = {
   type  : "REMOVE"
   clock : Clock
   id    : string
}

type Add = {
   type  : "ADD"
   clock : Clock
   id    : string
   value : string
}

type Initial = {
   type  : "INITIAL"
   clock : Clock
   id    : string
}

// —————————————————————————————————————————————————————————————————————————————
// Persistence

const set = new SyncSet<string>()

// —————————————————————————————————————————————————————————————————————————————
// Websocket

const { log, error } = console

class Client {
   ws: WebSocket | null = null
   #onMessage:(event:MessageEvent) => void

   constructor(onMessage: (M:MessageEvent) => void) {
      this.#onMessage = onMessage.bind(this)
   }

   connect() {
      const ws = new WebSocket(`ws://${window.location.host}/ws`)
      ws.onopen = (event) => {
         log("WebSocket connected: ", event)
         this.ws = ws
         ws.send(JSON.stringify({
            type: "INITIAL",
            clock: set.clock,
            id: set.id
         } as Initial))
      }

      ws.onmessage = this.#onMessage

      ws.onerror = (err) => {
         error("WebSocket connection error: ", err)
         this.ws?.close(1006, "Connection error.")
      }

      ws.onclose = (event) => {
         this.ws = null
         if (event.wasClean) {
            log("WebSocket cleanly closed.")
            log("Event Code: ", event.code)
            log("Event Reason: ", event.reason)
            return
         }
         error("WebSocket closed: ", event)
         setTimeout(() => this.connect(), 5000)
      }
   }
   
   send(action:Action) {
      if (!this.ws) throw Error("WebSocket not connected.")
      this.ws!.send(JSON.stringify(action))
      console.log("WebSocket sent: ", action)
   }

   close(reason:string, code=1000) {
      this.ws!.close(code, reason)
   }
}

export default {}