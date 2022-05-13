import { useRecoilValue } from "recoil"
import { todos_list_stats } from "../state/selectors"

// —————————————————————————————————————————————————————————————————————————————
// Component

function TodoStats() {
   const { Done, Today, Upcoming, Inbox, Trash } = useRecoilValue(todos_list_stats)
   return (
      <ul id="TodoStats">
         <li>Inbox: {Inbox}</li>
         <li>Today: {Today}</li>
         <li>Upcoming: {Upcoming}</li>
         <li>Done: {Done}</li>
         <li>Trash: {Trash}</li>
      </ul>
   )
}

// —————————————————————————————————————————————————————————————————————————————
// Export

export default TodoStats