import "./TodoView.css"
import { useRecoilState, useRecoilValue } from "recoil"
import { todos_view, TodoView as View } from "../../state/atoms"
import { todos_list_stats } from "../../state/selectors"

// —————————————————————————————————————————————————————————————————————————————
// Component

function TodoView() {
  const [view, setView] = useRecoilState(todos_view)
  const views: View[] = [ "all", "inbox", "today", "upcoming", "done", "trash", ]
  const stats = useRecoilValue(todos_list_stats)
  const icons = {
    all: <i className="material-symbols-rounded">apps</i>,
    inbox: <i className="material-symbols-rounded inbox">inbox</i>,
    today: <i className="material-symbols-rounded">today</i>,
    upcoming: <i className="material-symbols-rounded">event_upcoming</i>,
    done: <i className="material-symbols-rounded">event_available</i>,
    trash: <i className="material-symbols-rounded trash">delete</i>,
  }
  return (
    <nav id="TodoView">
      {
        views.map((v, i) => (
          <div onClick={() => setView(v)} className={v === view ? "item active" : "item"} key={i}>
            <span className="flex">{icons[v]}<p>{v}</p></span> 
            <span className="statistic">{stats[v]}</span>
          </div>
        ))
      }
    </nav>
  )
}

// —————————————————————————————————————————————————————————————————————————————
// Export

export default TodoView