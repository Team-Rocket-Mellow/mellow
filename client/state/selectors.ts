import { selector } from "recoil"
import { todos_list, todos_view } from "./atoms"
import { isSameDay, daysBetween } from "../../utility/time"

// —————————————————————————————————————————————————————————————————————————————
// Selector

export const todos_list_filtered = selector({
   key: "filteredView",
   get: ({ get }) => {
      const view = get(todos_view)
      const todos = get(todos_list)
      switch (view) {
         case "active": return todos.filter(todo => !todo.done)
         case "done": return todos.filter(todo => todo.done)
         case "inbox": return todos.filter(todo => !todo.trash && !todo.due)
         case "trash": return todos.filter(todo => todo.trash)
         case "today": return todos.filter(todo => isSameDay(todo.due))
         case "upcoming": return todos.filter(todo => todo.due 
            && 0 < daysBetween(new Date(), todo.due)
         )
         default: return todos
         // todo: deal with overdue tasks
      }
   },
})

export const todos_list_stats = selector({
   key: "todos_list_stats",
   get: ({ get }) => {
      const todos = get(todos_list)
      const inbox = todos.length
      const done = todos.filter(todo => todo.done).length
      const today = inbox - done
      const trash = todos.filter(todo => todo.trash).length;
      return { inbox, done, today, trash }
   }
})