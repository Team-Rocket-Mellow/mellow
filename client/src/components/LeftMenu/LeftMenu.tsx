import "./LeftMenu.css"
import { useRecoilState, useRecoilValue } from "recoil"
import { todos_view, left_menu } from "../../state/atoms"
import { todos_list_stats, todos_today } from "../../state/selectors"
import { TodoView } from "../../state/types"
import { Link } from "react-router-dom"
import Icon from "../assets/Icon"

// —————————————————————————————————————————————————————————————————————————————
// Component

function LeftMenu() {
  const [view, go] = useRecoilState(todos_view)
  const stats = useRecoilValue(todos_list_stats)
  const menuIsOn = useRecoilValue(left_menu);
  const has_overdue = useRecoilValue(todos_today).filter(t => !t.done).some(t => t.overdue)

  const views:TodoView[] = [ "all", "inbox", "today", "upcoming", "done", "trash", ]
  const icons = {
    all:      <Icon>apps</Icon>,
    inbox:    <Icon className="inbox">inbox</Icon>,
    today:    <Icon className="today">today</Icon>,
    upcoming: <Icon className="upcoming">event_upcoming</Icon>,
    done:     <Icon className="done">task_alt</Icon>,
    trash:    <Icon className="trash">delete</Icon>,
  }

  return (
    <nav id="LeftMenu" className={menuIsOn ? 'side-bar active' : 'side-bar'}>
      {
        views.map((v, i) => (
          <Link
            to={v}
            onClick={() => go(v)}
            className={v === view ? "item active" : "item"}
            key={i}
          >
            <span className="flex">{icons[v]}{v}</span>
            <span className={"statistic"} id={v === "today" && has_overdue ? "overdue" : ""}>
              {stats[v] || null}
            </span>
          </Link>
        ))
      }
    </nav>
  )
}

// —————————————————————————————————————————————————————————————————————————————
// Export

export default LeftMenu