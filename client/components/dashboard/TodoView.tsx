import { useRecoilState } from "recoil"
import { todos_view } from "../../state/atoms"
import { TodoView as View} from "../../state/atoms"

// —————————————————————————————————————————————————————————————————————————————
// Component

function TodoView() {
  const [view, setView] = useRecoilState(todos_view)
  const views: View[] = [ "Inbox", "Today", "Upcoming", "Done", "Trash" ]
  return (
    <nav id="TodoView">
      {
        views.map((v, i) => 
          <div 
            onClick={() => setView(v)} 
            className={v === view ? "active" : ""}
            key={i}
          >{v}</div>
        )
      }
    </nav>
  )
}

// —————————————————————————————————————————————————————————————————————————————
// Export

export default TodoView