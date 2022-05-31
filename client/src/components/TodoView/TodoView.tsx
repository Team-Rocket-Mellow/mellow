import "./TodoView.css"
import { useRecoilValue } from "recoil"
import { todos_list_filtered } from "../../state/selectors"
import { todos_view } from "../../state/atoms"
import TodoItem from "../TodoItem/TodoItem"
import { numberToMonth } from "../../utility/time"

// —————————————————————————————————————————————————————————————————————————————
// Component

function TodoView() {
  const todos = useRecoilValue(todos_list_filtered)
  const view = useRecoilValue(todos_view)

  function reportMonthAndDay(date: Date) {
    return `${numberToMonth(date.getMonth())} ${date.getDate()}`
  }

  return (
    <main id="TodoView">
      <header>
        <h1>{view}</h1>
      </header>
      <ul id="TodoList">
        {
          todos.map((todo, i) => <TodoItem key={i} {...todo} />)
        }
      </ul>
    </main>
  )
}

// —————————————————————————————————————————————————————————————————————————————
// Export

export default TodoView