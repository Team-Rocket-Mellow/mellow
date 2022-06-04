import { atom } from 'recoil'
import data from "./data"
import { Todo, TodoView } from "./types"
import { dayMonthYear } from "../utility/time"

// —————————————————————————————————————————————————————————————————————————————
// Atom

/** Original list of todos. */
export const todos_list = atom({
   key: "todos_state",
   default: data as Todo[],
})

/** Current todos view. */
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

/** Set default view. */
export const home = atom({
   key: "home",
   default: "inbox" as TodoView,
})

/** Set current date. */
export const current_date = atom({
   key: "date",
   default: dayMonthYear(new Date()),
})

export const add_is_active = atom({
   key: "modal_state",
   default: false,
})

export const command_is_active = atom({
   key: "command_state",
   default: false,
})