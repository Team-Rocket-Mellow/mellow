import { createStore } from "redux"
import { Action, State } from "./types"

// —————————————————————————————————————————————————————————————————————————————
// Reducer

const initialState:State = {
   todos: [
      { done: false, text: "Learn React" },
      { done: false, text: "Learn Redux" },
      { done: false, text: "Buy Milk" },
   ],
   view: "all",
}

function todoReducer(state, action:Action): State {
   switch (action.type) {
      case "ADD":
         return {
            ...state,
            todos: [...state.todos, action.payload],
         }
      case "DELETE":
         return {
            ...state,
            todos: state.todos.filter((__, index) => index !== action.payload),
         }

      default: return state
   }
}

// —————————————————————————————————————————————————————————————————————————————
// Store

const store = createStore(todoReducer, initialState)
export default store