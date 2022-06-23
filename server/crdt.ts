// —————————————————————————————————————————————————————————————————————————————
// Environment

const ADD    = "ADD"    as const
const REMOVE = "REMOVE" as const
const UNDO   = "UNDO"   as const
const REDO   = "REDO"   as const

type Action = {
   id: string
   type: "ADD" | "REMOVE"
   value: any
}

type Session = {
   type: "UNDO" | "REDO"
}

/** A map of operation history. */
type Past = { [id: string]: Action[] }

/** A vector clock. */
type Clock = { [id: string]: number }

// —————————————————————————————————————————————————————————————————————————————
// Utility

const not = (x: unknown) => !x
const uid = () => performance.now().toString(36)
   .concat(Math.random().toString(36))
   .replace(/\./g,"")

// —————————————————————————————————————————————————————————————————————————————
// Set

/**
 * A wrapper around a JavaScript `Set` which supports distributed offline-first
 * synchronization and local undo.
 * 
 * @example
 * const s1 = new SyncSet<number>()
 * const s2 = new SyncSet<number>()
 * s1.add(1)        // s1: {1},    s2: {}
 * s1.add(2)        // s1: {1, 2}, s2: {}
 * s2.sync(s1.past) // s1: {1, 2}, s2: {1, 2}
 * s2.add(0)        // s1: {1, 2}, s2: {0, 1, 2}
 * s2.remove(2)     // s1: {1, 2}, s2: {0, 1}
 * s1.sync(s2.past) // s1: {0, 1}, s2: {0, 1}
 */
class SyncSet<T> {
   set = new Set<T>()
   id = uid()
   past:Past = { [this.id]: [] }
   session:Action[] = []

   static invert(action:Action) {
      switch (action.type) {
         case ADD: return { ...action, type: REMOVE }
         case REMOVE: return { ...action, type: ADD }
      }
   }

   get clock() {
      const clock:Clock = {}
      for (const id in this.past) clock[id] = this.past[id].length
      return clock
   }

   #dispatch(action:Action) {
      if (this.id === action.id) this.session.push(action)
      switch (action.type) {
         case ADD:
            this.set.add(action.value)
            this.past[action.id].push(action)
            break
         case REMOVE:
            this.set.delete(action.value)
            this.past[action.id].push(action)
            break
      }
   }

   #dispatchSession(action:Session) {
      switch(action.type) {
         case UNDO:
            
         case REDO:
      }
   }

   deltaClock(remoteClock:Clock) {
      const localClock = this.clock
      const Δclock = {}
      for (const id in localClock) {
         if (not(id in remoteClock)) {
            Δclock[id] = localClock[id]
            continue
         }
         if (remoteClock[id] < localClock[id]) {
            Δclock[id] = localClock[id] - remoteClock[id]
         }
      }
      return Δclock
   }

   // ------------------------------------------------------
   // Local Methods

   add(value) { this.#dispatch({ id: this.id, type: ADD, value }) }
   remove(value) { this.#dispatch({ id: this.id, type: REMOVE, value }) }
   has(value) { return this.set.has(value) }
   undo() {
      if (this.session.length === 0) return 0
      const action = this.session.pop()!
      this.#dispatch(SyncSet.invert(action))
      return this.session.length
   }
   clearSession() { this.session = [] }

   // ------------------------------------------------------
   // Sync

   sync(remotePast:Past) {
      for (const id in remotePast) {
         if (not(id in this.past)) this.past[id] = []
         if (this.past[id].length < remotePast[id].length)
            remotePast[id]
               .slice(this.past[id].length)
               .forEach(action => this.#dispatch(action))
      }
   }

   deltaPast(remoteClock:Clock): Past {
      const Δclock = this.deltaClock(remoteClock)
      const Δpast = {}
      for (const id in Δclock) Δpast[id] = this.past[id].slice(-Δclock[id])
      return Δpast
   }
}

// —————————————————————————————————————————————————————————————————————————————
// Client

type SyncResponse = {
   past:Past
   clock:Clock
}

type Sender = () => Promise<SyncResponse>

type Online = boolean

class Client<T> {
   crdt: SyncSet<T>
   isOnline = false
   lastSync:Clock = {}

   constructor(crdt: SyncSet<T>) {
      this.crdt = crdt
   }

   onReceive(past:Past, clock:Clock) {

   }
}