import { selector } from "recoil"
import { todos_list, todos_view } from "./atoms"
import { daysBetween } from "../../utility/time"

// —————————————————————————————————————————————————————————————————————————————
// Selector

export const todos_list_filtered = selector({
   key: "todos_list_filtered",
   get: ({ get }) => {
      const view = get(todos_view)
      const todos = get(todos_list)
      switch (view) {
         case "active": return todos.filter(todo => !todo.done)
         case "done": return todos.filter(todo => todo.done)
         case "inbox": return todos.filter(todo => !todo.trash && !todo.due && !todo.done)
         case "trash": return todos.filter(todo => todo.trash)
         case "today": return todos.filter(todo => todo.due && daysBetween(new Date(), todo.due) <= 0)
         case "upcoming": return todos.filter(todo => todo.due && 0 < daysBetween(new Date(), todo.due))
         case "all": return todos
         default: return todos
      }
   },
})

export const todos_list_stats = selector({
   key: "todos_list_stats",
   get: ({ get }) => {
      const todos = get(todos_list)
      const inbox = todos.filter(todo => !todo.trash && !todo.due && !todo.done).length
      const done = todos.filter(todo => todo.done).length
      const today = todos.filter(todo => todo.due && daysBetween(new Date(), todo.due) <= 0).length
      const upcoming = todos.filter(todo => todo.due && 0 < daysBetween(new Date(), todo.due)).length
      const trash = todos.filter(todo => todo.trash).length
      return { inbox, done, today, trash, upcoming }
   }
})