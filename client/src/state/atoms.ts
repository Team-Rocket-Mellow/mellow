import { atom } from 'recoil'
import data from "./data"
import { Todo, TodoView, Theme } from "./types"
import { dayMonthYearString } from "../utility/time"

// —————————————————————————————————————————————————————————————————————————————
// Data

/** Original list of todos. */
export const todos_list = atom<Todo[]>({
   key: "todos_state",
   default: data,
})

/** Current todos view. */
export const todos_view = atom<TodoView>({
   key: "todos_view",
   default: "inbox",
})

export const user = atom({
   key: "user",
   default: {
      token: null,
      expiry: null,
   }
})

/** Set current date. */
export const current_date = atom({
   key: "date",
   default: dayMonthYearString(new Date()),
})

// —————————————————————————————————————————————————————————————————————————————
// Interface

/** Set default view. */
export const home = atom<TodoView>({
   key: "home",
   default: "inbox",
})

export const theme = atom<Theme>({
   key: "theme",
   default: "light",
})

export const add_is_active = atom({
   key: "modal_state",
   default: false,
})

export const command_is_active = atom({
   key: "command_state",
   default: false,
})