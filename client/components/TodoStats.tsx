import { useRecoilValue } from "recoil"
import { todos_list_stats } from "../state/selectors"

// —————————————————————————————————————————————————————————————————————————————
// Component

function TodoStats() {
   const { done, remaining, total } = useRecoilValue(todos_list_stats)
   return (
      <ul id="TodoStats">
         <li>all: {total}</li>
         <li>active: {remaining}</li>
         <li>done: {done}</li>
      </ul>
   )
}

// —————————————————————————————————————————————————————————————————————————————
// Export

export default TodoStats