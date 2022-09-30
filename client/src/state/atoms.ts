import { atom } from 'recoil'
import type { Todo, TodoView, Theme } from "./types"
import { dayMonthYear } from "../utility/time"
import data from "./data"

// —————————————————————————————————————————————————————————————————————————————
// Data

/** Original list of todos. */
export const todos_list = atom<Todo[]>({
   key: "todos_state",
   default: data,
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
   default: dayMonthYear(new Date()),
})

// —————————————————————————————————————————————————————————————————————————————
// Interface

export const view = atom({
   key: "view",
   default: "inbox" as TodoView | "search",
})

export const search = atom({
   key: "search",
   default: "",
})

/** Set default view. */
export const home = atom<TodoView>({
   key: "home",
   default: "all",
})

/** Current todos view. */
export const todos_view = atom<TodoView>({
   key: "todos_view",
   default: home,
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

// —————————————————————————————————————————————————————————————————————————————
// Modals

export const add_is_active = atom({
   key: "modal_state",
   default: false,
})

export const command_is_active = atom({
   key: "command_state",
   default: false,
})

export const setting_is_active = atom({
   key: "setting_state",
   default: false,
})

export const profile_is_active = atom({
   key: "profile_state",
   default: false,
})