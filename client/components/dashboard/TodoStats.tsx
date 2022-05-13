import { useRecoilValue } from "recoil"
import { todos_list_stats } from "../../state/selectors"

// —————————————————————————————————————————————————————————————————————————————
// Component

function TodoStats() {
   const { done, today, upcoming, inbox, trash } = useRecoilValue(todos_list_stats)
   return (
      <ul id="TodoStats">
         <li>Inbox: {inbox}</li>
         <li>Today: {today}</li>
         <li>Upcoming: {upcoming}</li>
         <li>Done: {done}</li>
         <li>Trash: {trash}</li>
      </ul>
   )
}

// —————————————————————————————————————————————————————————————————————————————
// Export

export default TodoStats