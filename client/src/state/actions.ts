import { nanoid } from "nanoid";
import { Todo } from "./atoms";

// —————————————————————————————————————————————————————————————————————————————
// Actions

/**
 * Given todo `text` and UTC date string `due`, return a todo object.
 * @example
 * createTodo("Do homework") // due date defaults to null
 * createTodo("Buy milk", "2020-01-01")
 */
export function createTodo(text:string, due=""): Todo {
   return {
      id: nanoid(36),
      text,
      start: new Date(),
      due: due.length ? new Date(due) : null,
      done: false,
      trash: false,
      pending: false,
   }
}