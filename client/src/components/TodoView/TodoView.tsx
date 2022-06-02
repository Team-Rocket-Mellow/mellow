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

  switch (view) {
    case "today": return <TodayView />
    case "upcoming":
      return (
        <main id="TodoView">
          <section>
            <h1>{view}</h1>
            <ul id="TodoList">
              {
                todos.map((todo, i) => !todo.done && <TodoItem key={i} {...todo} />)
              }
            </ul>
          </section>
          {
            todos.some(todo => todo.done) && (
              <section>
                <h1>done</h1>
                <ul id="TodoList">
                  {
                    todos.map((todo, i) => todo.done && <TodoItem key={i} {...todo} />)
                  }
                </ul>
              </section>
            )
          }
        </main>
    )
    case "done":
    case "inbox":
    default:
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
}

function TodayView() {
  const todos = useRecoilValue(todos_list_filtered)
  const view = useRecoilValue(todos_view)
  const now = new Date()
  const headerStyle = { display: "flex", justifyContent: "space-between", }
  const timeStyle = { color: "green", }

  return (
    <main id="TodoView">
      <section className="today">
        <header>
          <h1 style={headerStyle}>
            <span>{view}</span>
            <time style={timeStyle}>{reportMonthAndDay(now)}</time>
          </h1>
        </header>
        <ul id="TodoList">
          {
            todos.map((todo, i) => !todo.overdue && !todo.done && <TodoItem key={i} {...todo} />)
          }
        </ul>
      </section>
      <section className="overdue">
        <h1>overdue</h1>
        <ul id="TodoList">
          {
            todos.map((todo, i) => todo.overdue && <TodoItem key={i} {...todo} />)
          }
        </ul>
      </section>
        {
          todos.some(todo => todo.done) && (
            <section>
              <h1>done</h1>
              <ul id="TodoList">
                {
                  todos.map((todo, i) => todo.done && <TodoItem key={i} {...todo} />)
                }
              </ul>
            </section>
          )
        }
    </main>
  )
}

// —————————————————————————————————————————————————————————————————————————————
// Export

export default TodoView