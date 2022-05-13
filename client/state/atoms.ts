import { atom } from 'recoil';

// —————————————————————————————————————————————————————————————————————————————
// Type

export type Todo = {
   id: number
   text: string
   done: boolean
   upcoming: boolean
   trash: boolean
}

export type TodoView = "Inbox" | "Today" | "Upcoming" | "Done" | "Trash" 

// —————————————————————————————————————————————————————————————————————————————
// Atom

export const todos_list = atom({
   key: "todos_state",
   default: [] as Todo[],
})

export const todos_view = atom({
   key: "todos_view",
   default: "Inbox" as TodoView,
})