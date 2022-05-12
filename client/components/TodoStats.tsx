import { useRecoilValue } from "recoil"
import { todos_list_stats } from "../state/selectors"

// —————————————————————————————————————————————————————————————————————————————
// Component

function TodoStats() {
   const { done, remaining, total } = useRecoilValue(todos_list_stats)
   return (
      <ul id="TodoStats">
         <li>All: {total}</li>
         <li>Active: {remaining}</li>
         <li>Done: {done}</li>
      </ul>
   )
}

// —————————————————————————————————————————————————————————————————————————————
// Export

export default TodoStats