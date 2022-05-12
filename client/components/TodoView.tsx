import { useRecoilState } from "recoil"
import { todos_view } from "../state/atoms"
import { TodoView as View} from "../state/atoms"

// —————————————————————————————————————————————————————————————————————————————
// Component

function TodoView() {
   const [view, setView] = useRecoilState(todos_view)
   const views: View[] = ["all", "active", "done"]
   return (
      <nav id="TodoView">
         {
            views.map((v, i) => 
               <button 
                  onClick={() => setView(v)} 
                  key={i}
                  className={v === view ? "active" : ""}
               >{v}</button>
            )
         }
      </nav>
   )
}

// —————————————————————————————————————————————————————————————————————————————
// Export

export default TodoView