import SyncSet from "../../../crdt/set"

// —————————————————————————————————————————————————————————————————————————————
// Types

type Peers = { [username:string]: string }
type Clock = { [id:string]: number }

// -----------------------------------------------------------------------------
// Actions

type Actions = Remove | Initial

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

function connect() {
   const ws = new WebSocket(`ws://${window.location.host}/ws`)

   ws.onopen = function() {
      ws.send(JSON.stringify({
         type: "INITIAL",
         clock: set.clock,
         id: set.id
      } as Initial))
   }

   ws.onerror = function(err) {
      console.error(err)
      ws.close()
   }

   ws.onclose = function() {

   }
}



class Client {
   ws: WebSocket | null = null
   constructor() {
      this.connect()
   }

   connect() {
      let ws = new WebSocket(`ws://${window.location.host}/ws`)
      ws.onopen = (event) => {
         log("WebSocket connected: ", event)
         this.ws = ws
         ws.send(JSON.stringify({
            type: "INITIAL",
            clock: set.clock,
            id: set.id
         } as Initial))
      }

      ws.onerror = (err) => {
         error("WebSocket connection error: ", err)
         this.ws?.close()
      }

      ws.onclose = (event) => {
         if (event.wasClean) {
            log("WebSocket cleanly closed.")
            log("Event Code: ", event.code)
            log("Event Reason: ", event.reason)
            this.ws = null
            return
         }
         setTimeout(() => { this.connect() }, 5000, this)
      }
   }
}

export default {}