import { useRecoilValue } from "recoil"
import { todos_list_filtered } from "../state/selectors"
import TodoItem from "./TodoItem/TodoItem"

// —————————————————————————————————————————————————————————————————————————————
// Component

function TodoList() {
  const todos = useRecoilValue(todos_list_filtered)

  return (
    <ul id="TodoList">
      {
        todos.map((todo, i) => <TodoItem key={i} {...todo} />)
      }
    </ul>
  )
}

// —————————————————————————————————————————————————————————————————————————————
// Export

export default TodoList