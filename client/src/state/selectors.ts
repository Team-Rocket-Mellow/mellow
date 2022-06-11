import { RecoilValueReadOnly, selector } from "recoil"
import { todos_list, todos_view } from "./atoms"
import { daysBetween } from "../utility/time"
import { TodoElement } from "./types"

// —————————————————————————————————————————————————————————————————————————————
// Small Selectors

/** todos → todos with due date */
const todos = selector({
   key: "todos_with_overdue",
   get: ({ get }) => get(todos_list)
      .map(todo => ({
         ...todo,
         overdue: todo.due && daysBetween(new Date(), todo.due) <= -1,
      }))
      .sort((a, b) => Number(a.due) - Number(b.due)),
}) as RecoilValueReadOnly<TodoElement[]>

/** todos not in trash */
const todos_active = selector({
   key: "todos_active",
   get: ({ get }) => get(todos).filter(todo => !todo.trash),
})

/** todos without due date */
 const todos_inbox = selector({
   key: "todos_inbox",
   get: ({ get }) => get(todos_active).filter(todo => !todo.due),
})

/** todos due today or before */
export const todos_today = selector({
   key: "todos_today",
   get: ({ get }) => get(todos_active)
      .filter(todo => todo.due && daysBetween(new Date(), todo.due) <= 0),
})

/** todos due after today. */
const todos_upcoming = selector({
   key: "todos_upcoming",
   get: ({ get }) => get(todos_active)
      .filter(todo => todo.due && daysBetween(new Date(), todo.due) > 0),
})

/** todos done */
const todos_done = selector({
   key: "todos_done",
   get: ({ get }) => get(todos_active).filter(todo => todo.done),
})

/** todos trashed */
const todos_trash = selector({
   key: "todos_trash",
   get: ({ get }) => get(todos).filter(todo => todo.trash),
})

// —————————————————————————————————————————————————————————————————————————————
// Big Selectors

/** Todos in the current view. */
export const todos_list_filtered = selector({
   key: "todos_list_filtered",
   get: ({ get }) => {
      const view = get(todos_view)
      switch (view) {
         case "all"      : return get(todos)
         case "inbox"    : return get(todos_inbox)
         case "today"    : return get(todos_today)
         case "upcoming" : return get(todos_upcoming)
         case "done"     : return get(todos_done)
         case "trash"    : return get(todos_trash)
         default         : throw Error(`Selector <todos_list_filtered> received invalid view: ${view}.`)
      }
   },
})

/** Statistics for all todo views. */
export const todos_list_stats = selector({
   key: "todos_list_stats",
   get: ({ get }) => ({
      all      : get(todos).length,
      inbox    : get(todos_inbox).filter(t => !t.done).length,
      today    : get(todos_today).filter(t => !t.done).length,
      upcoming : get(todos_upcoming).filter(t => !t.done).length,
      done     : get(todos_done).length,
      trash    : get(todos_trash).length,
   })
})