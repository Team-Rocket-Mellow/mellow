import "./TodoView.css"
import { useRecoilValue } from "recoil"
import { todos_list_filtered } from "../../state/selectors"
import { todos_view, sideBar} from "../../state/atoms"
import TodoItem from "../TodoItem/TodoItem"
import { reportMonthAndDay } from "../../utility/time"
// —————————————————————————————————————————————————————————————————————————————
// Constituent

function TodoSection({ title, todos, ...props }) {
  return (
    <section {...props}>
      <h1>{title}</h1>
      <ul className="TodoList">
        {
          todos.map((todo, i) => <TodoItem key={i} {...todo} />)
        }
      </ul>
    </section>
  )
}

function Celebration({ children }: { children?: string }) {
  return (
    <main id="TodoView">
      <section className="hooray">
        <i className="material-symbols-rounded">done_outline</i>
        <p>{children ?? "Hooray you are done!"}</p>
      </section>
    </main>
  )
}

// —————————————————————————————————————————————————————————————————————————————
// Component

function MainView() {
  const todos = useRecoilValue(todos_list_filtered)
  const view = useRecoilValue(todos_view)
  const done = todos.filter(t => t.done)
  const undone = todos.filter(t => !t.done)
  const watchLeftMenu = useRecoilValue(sideBar); 

  switch (view) {
    case "today": 
      const now = new Date()
      const overdue = undone.filter(t => t.overdue)
      return (
        <main id="TodoView" className={watchLeftMenu ? 'todo' : 'todoView-closed'}>
        <section id={view}>
          <header>
            <h1>
              <span>{view}</span>
              <time>{reportMonthAndDay(now)}</time>
            </h1>
          </header>
          <ul id="TodoList">
            {
              undone.map((t, i) => !t.overdue && <TodoItem key={i} {...t} />)
            }
          </ul>
        </section>
        { !!overdue.length && <TodoSection title="overdue" todos={overdue} /> }
        { !!done.length && <TodoSection title="done" todos={done} /> }
      </main>
      )
    case "done": return (
      done.length ?
         <main id="TodoView" className={watchLeftMenu ? 'todo' : 'todoView-closed'}>
            <TodoSection title={view} todos={done} />
          </main>
        : <Celebration>Productivity is dangerous.</Celebration>
    )
    case "all":
    case "inbox":
    case "upcoming":
    default: return (
      <main id="TodoView" className={watchLeftMenu ? 'todo' : 'todoView-closed'}>
        <TodoSection title={view} todos={undone} id={view} />
        { !undone.length && <Celebration /> }
        { !!done.length && <TodoSection title="done" todos={done} /> }
      </main>
    )
  }
}

// —————————————————————————————————————————————————————————————————————————————
// Export

export default MainView