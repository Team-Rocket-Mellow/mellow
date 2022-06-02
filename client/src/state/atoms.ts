import { atom } from 'recoil'
import data from "./data"
import { Todo, TodoView } from "./types"

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

export const modal_is_active = atom({
   key: "modal_state",
   default: false,
})