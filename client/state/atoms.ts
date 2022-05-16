import { atom } from 'recoil'

// —————————————————————————————————————————————————————————————————————————————
// Type

export type Todo = {
   id      : number
   text    : string
   done    : boolean
   trash   : boolean
   start   : Date         // UTC
   due     : Date | null  // UTC
   pending : boolean      // pending change yet persisted on server
}

export type TodoView = "all"
   | "active"
   | "done"
   | "inbox"
   | "trash"
   | "today"
   | "upcoming"

export type Auth = {
   token  : string
   expiry : Date
}

// —————————————————————————————————————————————————————————————————————————————
// Atom

export const todos_list = atom({
   key: "todos_state",
   default: [] as Todo[],
})

export const todos_view = atom({
   key: "todos_view",
   default: "inbox" as TodoView,
})

export const user = atom({
   key: "user",
   default: {
      token: null,
      expiry: null,
   }
})