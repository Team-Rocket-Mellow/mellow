import SyncSet from "../../../crdt/set"

// —————————————————————————————————————————————————————————————————————————————
// Types

type Peers = { [username:string]: string }
type Clock = { [id:string]: number }

// -----------------------------------------------------------------------------
// Actions

const ADD     = "ADD"     as const
const REMOVE  = "REMOVE"  as const
const ACK     = "ACK"     as const
const INITIAL = "INITIAL" as const

type Action = Add | Remove | Initial

type Remove = {
   type  : "REMOVE"
   id    : string
   clock : Clock
}

type Add = {
   type  : "ADD"
   id    : string
   clock : Clock
   value : string
}

type Initial = {
   type  : "INITIAL"
   id    : string
   clock : Clock
}

type Ack = {
   type  : "ACK"
   id    : string
   clock0 : Clock
   clockF : Clock
}

interface Message {
   type: "ADD" | "REMOVE" | "ACK" | "INITIAL"
   id: string
}

// —————————————————————————————————————————————————————————————————————————————
// Websocket

const { log, error } = console

class Client {
   ws: WebSocket | null = null
   onMessage:(event:MessageEvent) => void

   constructor(onMessage:(msg:MessageEvent) => void) { this.onMessage = onMessage }

   connect() {
      const ws = new WebSocket(`ws://${window.location.host}/ws`)
      ws.onopen = (event) => {
         log("WebSocket connected: ", event)
         this.ws = ws
         ws.send(JSON.stringify({ type: INITIAL, clock: set.clock, id: set.id, } as Initial))
      }

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

// —————————————————————————————————————————————————————————————————————————————
// Persistence

function onMessage(event:MessageEvent) {
   const msg = JSON.parse(event.data)
}

const set = new SyncSet<any>()

export default {}