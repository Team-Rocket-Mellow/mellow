import { Action } from "./types"

// —————————————————————————————————————————————————————————————————————————————
// Actions

export const addTodo = (text:string): Action => ({
   type: "ADD",
   payload: {
      text,
      done: false,
   }
})

export const deleteTodo = (text:string): Action => ({
   type: "DELETE",
   payload: text,
})

export const toggleTodo = (text:string): Action => ({
   type: "TOGGLE",
   payload: text,
})