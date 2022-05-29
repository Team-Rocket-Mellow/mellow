// —————————————————————————————————————————————————————————————————————————————
// Atoms

export type Todo = {
   id      : string
   text    : string
   done    : boolean
   trash   : boolean
   start   : Date         // UTC
   due     : Date | null  // UTC
   pending : boolean      // pending change yet persisted on server
}

export type TodoView = "all"
   | "active"
   | "done"
   | "inbox"
   | "trash"
   | "today"
   | "upcoming"

export type Auth = {
   token  : string
   expiry : Date
}

// —————————————————————————————————————————————————————————————————————————————
// Derived

export type TodoElement = {
   id      : string
   text    : string
   done    : boolean
   trash   : boolean
   start   : Date         // UTC
   due     : Date | null  // UTC
   pending : boolean      // pending change yet persisted on server
   overdue : boolean      // due date is in the past
}