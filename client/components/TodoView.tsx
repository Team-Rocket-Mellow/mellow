import { useRecoilState } from 'recoil'
import { todos_view } from '../state/atoms'

// —————————————————————————————————————————————————————————————————————————————
// Component

function TodoView() {
   const [view, setView] = useRecoilState(todos_view)
   return (
      <nav id="TodoView">
         <button onClick={() => setView("all")}>All</button>
         <button onClick={() => setView("active")}>Active</button>
         <button onClick={() => setView("done")}>Done</button>
      </nav>
   )   
}

// —————————————————————————————————————————————————————————————————————————————
// Export

export default TodoView