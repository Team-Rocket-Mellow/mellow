import "./TodoView.css"
import { useRecoilValue } from "recoil"
import { monthDayString } from "../../utility/time"
import { todos_list_filtered } from "../../state/selectors"
import { todos_view, left_menu } from "../../state/atoms"
import TodoItem from "../TodoItem/TodoItem"
import Icon from "../assets/Icon"

// —————————————————————————————————————————————————————————————————————————————
// Constituent

function TodoSection({ title, todos, ...props }) {
  return (
    <section {...props}>
      <h1>{title}</h1>
      <ul className="TodoList">
        { todos.map((todo, i) => <TodoItem key={i} {...todo} />) }
      </ul>
    </section>
  )
}

function Celebration({ children }: { children?: string }) {
  return (
    <section id="Celebration">
      <Icon>done_outline</Icon>
      <p>{children ?? "Hooray you are done!"}</p>
    </section>
  )
}

// —————————————————————————————————————————————————————————————————————————————
// Component

function TodoView() {
  const todos = useRecoilValue(todos_list_filtered)
  const view = useRecoilValue(todos_view)
  const done = todos.filter(t => t.done)
  const undone = todos.filter(t => !t.done)
  const isMenuOn = useRecoilValue(left_menu)

  switch (view) {
    case "today":
      const now = new Date()
      const overdue = undone.filter(t => t.overdue)
      return (
        <main id="TodoView" className={isMenuOn ? 'open' : 'close'}>
          <section id={view}>
            <header>
              <h1>
                <span>{view}</span>
                <time>{monthDayString(now)}</time>
              </h1>
            </header>
            <ul id="TodoList">
              {
                undone.map((t, i) => !t.overdue && <TodoItem key={i} {...t} />)
              }
            </ul>
          </section>
          { !undone.length && <Celebration /> }
          { !!overdue.length && <TodoSection title="overdue" todos={overdue} /> }
          { !!done.length && <TodoSection title="done" todos={done} /> }
        </main>
      )
    case "done": return (
      <main id="TodoView" className={isMenuOn ? 'open' : 'close'}>
        <TodoSection id={view} title={view} todos={done} />
        { !done.length && <Celebration>Productivity is dangerous.</Celebration> }
      </main>
    )
    case "all":
    case "inbox":
    case "upcoming": return (
      <main id="TodoView" className={isMenuOn ? 'open' : 'close'}>
        <TodoSection id={view} title={view} todos={undone} />
        { !undone.length && <Celebration /> }
        { !!done.length && <TodoSection title="done" todos={done} /> }
      </main>
    )
    default: throw Error(`Bad view: ${view}`)
  }
}

// —————————————————————————————————————————————————————————————————————————————
// Export

export default TodoView