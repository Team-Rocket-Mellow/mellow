import "./TodoView.css"
import { useRecoilValue } from "recoil"
import { todos_list_filtered } from "../../state/selectors"
import { todos_view } from "../../state/atoms"
import TodoItem from "../TodoItem/TodoItem"
import { reportMonthAndDay } from "../../utility/time"

// —————————————————————————————————————————————————————————————————————————————
// Component

function TodoView() {
  const todos = useRecoilValue(todos_list_filtered)
  const view = useRecoilValue(todos_view)

  return view !== "today" ? (
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
  ) : (
    <TodayView />
  )
}

function TodayView() {
  const todos = useRecoilValue(todos_list_filtered)
  const view = useRecoilValue(todos_view)
  const now = new Date()
  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
  }
  // gray
  const timeStyle = {
    color: "green",
  }
  return (
    <main id="TodoView" className="today">
      <header>
        <h1 style={headerStyle}>
          <span>{view}</span>
          <time style={timeStyle}>{reportMonthAndDay(now)}</time>
        </h1>
      </header>
      <ul id="TodoList">
        {
          todos.map((todo, i) => !todo.overdue && <TodoItem key={i} {...todo} />)
        }
      </ul>
      <br />
      <header>
        <h1 style={headerStyle}>
          <span>overdue</span>
        </h1>
      </header>
      <ul id="TodoList">
        {
          todos.map((todo, i) => todo.overdue && <TodoItem key={i} {...todo} />)
        }
      </ul>
    </main>
  )
}

// —————————————————————————————————————————————————————————————————————————————
// Export

export default TodoView