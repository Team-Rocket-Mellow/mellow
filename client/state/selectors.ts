import { selector } from "recoil"
import { todos_list, todos_view } from "../state/atoms"

// —————————————————————————————————————————————————————————————————————————————
// Selector

export const todos_list_filtered = selector({
   key: "filteredView",
   get: ({ get }) => {
      const view = get(todos_view)
      const todos = get(todos_list)
      switch (view) {
         case "Today": return todos.filter(todo => !todo.done)
         case "Done": return todos.filter(todo => todo.done)
         default: return todos
      }
   },
})

export const todos_length = selector({
   key: "todos_length",
   get: ({ get }) => {
      const todos = get(todos_list)
      return todos.length
   }
})

export const todos_list_stats = selector({
   key: "todos_list_stats",
   get: ({ get }) => {
      const todos = get(todos_list)
      const Inbox = todos.length
      const Done = todos.filter(todo => todo.done).length
      const Today = Inbox - Done
      const Upcoming = todos.filter(todo => todo.upcoming).length;
      const Trash = todos.filter(todo => todo.trash).length;
      return { Inbox, Done, Today, Upcoming, Trash }
   }
})