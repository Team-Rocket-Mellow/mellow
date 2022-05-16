import { useRecoilState, useRecoilValue } from "recoil"
import { todos_view, TodoView as View } from "../../state/atoms"
import { todos_list_stats } from "../../state/selectors"

// —————————————————————————————————————————————————————————————————————————————
// Component

function TodoView() {
  const [view, setView] = useRecoilState(todos_view)
  const views: View[] = [ "all", "inbox", "today", "upcoming", "done", "trash", ]
  const stats = useRecoilValue(todos_list_stats)
  return (
    <nav id="TodoView">
      {
        views.map((v, i) => (
          <div
            onClick={() => setView(v)}
            className={v === view ? "item active" : "item"}
            key={i}
          >{v} ({stats[v]})</div>
        ))
      }
    </nav>
  )
}

// —————————————————————————————————————————————————————————————————————————————
// Export

export default TodoView