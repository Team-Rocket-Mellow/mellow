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
         case "active": return todos.filter(todo => !todo.done)
         case "done": return todos.filter(todo => todo.done)
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
      const total = todos.length
      const done = todos.filter(todo => todo.done).length
      const remaining = total - done
      return { total, done, remaining }
   }
})