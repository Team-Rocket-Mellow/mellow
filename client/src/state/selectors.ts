import { selector } from "recoil"
import { todos_list, todos_view } from "./atoms"
import { daysBetween } from "../utility/time"

// —————————————————————————————————————————————————————————————————————————————
// Small Selectors

const todos = selector({
   key: "todos_with_overdue",
   get: ({ get }) => get(todos_list)
      .map(todo => ({
         ...todo,
         overdue: todo.due && daysBetween(new Date(), todo.due) <= -1,
      }))
      .sort((a, b) => Number(a.due) - Number(b.due)),
})

const todos_active = selector({
   key: "todos_active",
   get: ({ get }) => get(todos).filter(todo => !todo.done && !todo.trash),
})

const todos_done = selector({
   key: "todos_done",
   get: ({ get }) => get(todos).filter(todo => todo.done && !todo.trash),
})

const todos_inbox = selector({
   key: "todos_inbox",
   get: ({ get }) => get(todos).filter(todo => !todo.trash && !todo.due && !todo.done),
})

const todos_trash = selector({
   key: "todos_trash",
   get: ({ get }) => get(todos).filter(todo => todo.trash),
})

const todos_today = selector({
   key: "todos_today",
   get: ({ get }) => get(todos).filter(todo => !todo.trash && todo.due && daysBetween(new Date(), todo.due) <= 0),
})

const todos_upcoming = selector({
   key: "todos_upcoming",
   get: ({ get }) => get(todos).filter(todo => todo.due && daysBetween(new Date(), todo.due) > 0),
})

// —————————————————————————————————————————————————————————————————————————————
// Big Selectors

export const todos_list_filtered = selector({
   key: "todos_list_filtered",
   get: ({ get }) => {
      const view = get(todos_view)
      switch (view) {
         case "all": return get(todos)
         case "active": return get(todos_active)
         case "done": return get(todos_done)
         case "inbox": return get(todos_inbox)
         case "trash": return get(todos_trash)
         case "today": return get(todos_today)
         case "upcoming": return get(todos_upcoming)
         default: throw Error(`Selector <todos_list_filtered> received invalid view: ${view}.`)
      }
   },
})

export const todos_list_stats = selector({
   key: "todos_list_stats",
   get: ({ get }) => ({
      all: get(todos).length,
      active: get(todos_active).length,
      done: get(todos_done).length,
      inbox: get(todos_inbox).length,
      trash: get(todos_trash).length,
      today: get(todos_today).length,
      upcoming: get(todos_upcoming).length,
   })
})