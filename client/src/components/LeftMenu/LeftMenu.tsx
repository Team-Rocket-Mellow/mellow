import "./LeftMenu.css"
import { useState, useEffect } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { todos_view, sideBar } from "../../state/atoms"
import { todos_list_stats } from "../../state/selectors"
import { TodoView } from "../../state/types"
import { Link } from "react-router-dom"

// —————————————————————————————————————————————————————————————————————————————
// Component

function LeftMenu() {
  const [view, setView] = useRecoilState(todos_view)
  const views:TodoView[] = [ "all", "inbox", "today", "upcoming", "done", "trash", ]
  const stats = useRecoilValue(todos_list_stats)
  const watchLeftMenu = useRecoilValue(sideBar);

  const icons = {
    all:      <i className="material-symbols-rounded">apps</i>,
    inbox:    <i className="material-symbols-rounded inbox">inbox</i>,
    today:    <i className="material-symbols-rounded today">today</i>,
    upcoming: <i className="material-symbols-rounded upcoming">event_upcoming</i>,
    done:     <i className="material-symbols-rounded done">event_available</i>,
    trash:    <i className="material-symbols-rounded trash">delete</i>,
  }

  const SideMenu = () => {

    return <>{views.map((v, i) => (
      <Link
        to={v}
        onClick={() => setView(v)}
        className={v === view ? "item active" : "item"}
        key={i}
        tabIndex={1}
      >
        <span className="flex">{icons[v]}{v}</span>
        <span className="statistic">{stats[v] || null}</span>
      </Link>
    ))}</>
  };

  
  return (
    <nav id="LeftMenu" className={watchLeftMenu ? 'side-bar active' : 'side-bar'}>
      <SideMenu />
    </nav>
  )
}

// —————————————————————————————————————————————————————————————————————————————
// Export

export default LeftMenu