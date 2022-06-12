import { atom } from 'recoil'
import data from "./data"
import { Todo, TodoView, Theme } from "./types"
import { dayMonthYear } from "../utility/time"

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

// —————————————————————————————————————————————————————————————————————————————
// Interface

/** Set default view. */
export const home = atom<TodoView>({
   key: "home",
   default: "inbox",
})

/** Set current date. */
export const current_date = atom({
   key: "date",
   default: dayMonthYear(new Date()),
})

/** toggle LeftMenu */
export const left_menu = atom({
   key: "left_menu",
   default: true,
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