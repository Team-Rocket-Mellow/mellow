import { atom } from 'recoil'
import data from "./data"

// —————————————————————————————————————————————————————————————————————————————
// Type

export type Todo = {
   id      : string
   text    : string
   done    : boolean
   trash   : boolean
   start   : Date         // UTC
   due     : Date | null  // UTC
   pending : boolean      // pending change yet persisted on server
}

export type TodoElement = {
   id      : string
   text    : string
   done    : boolean
   trash   : boolean
   start   : Date         // UTC
   due     : Date | null  // UTC
   pending : boolean      // pending change yet persisted on server
   overdue : boolean      // due date is in the past
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
   default: data as Todo[],
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