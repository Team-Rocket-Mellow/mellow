import { atom } from 'recoil'

// —————————————————————————————————————————————————————————————————————————————
// Type

export type Todo = {
   id: number
   text: string
   done: boolean
   trash: boolean
   date_start: Date
   date_due: Date    // used to determine "Today" or "Upcoming" status
   pending: boolean  // pending change yet persisted on server
}

export type TodoView = "inbox"
   | "all"
   | "active"
   | "done"
   | "today"
   | "upcoming"
   | "trash"

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