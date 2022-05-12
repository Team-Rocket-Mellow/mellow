import { atom } from 'recoil';

// —————————————————————————————————————————————————————————————————————————————
// Type

export type Todo = {
   id: number
   text: string
   done: boolean
}

export type TodoView = "all" | "active" | "done"

// —————————————————————————————————————————————————————————————————————————————
// Atom

export const todos_list = atom({
   key: "todos_state",
   default: [] as Todo[],
})

export const todos_view = atom({
   key: "todos_view",
   default: "all" as TodoView,
})