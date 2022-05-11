// —————————————————————————————————————————————————————————————————————————————
// Types

export type Todo = {
   done: boolean,
   text: string,
}

export type State = {
   todos: Todo[],
   view: "all" | "done" | "active",
}

export type Action = {
   type: "ADD" | "DELETE" | "TOGGLE",
   payload: any,
}
