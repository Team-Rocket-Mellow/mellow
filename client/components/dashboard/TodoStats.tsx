import { useRecoilValue } from "recoil"
import { todos_list_stats } from "../../state/selectors"

// —————————————————————————————————————————————————————————————————————————————
// Component

function TodoStats() {
  const { done, today, inbox, trash } = useRecoilValue(todos_list_stats)
  return (
    <ul id="TodoStats">
      <li>inbox: {inbox}</li>
      <li>today: {today}</li>
      <li>done: {done}</li>
      <li>trash: {trash}</li>
    </ul>
  )
}

// —————————————————————————————————————————————————————————————————————————————
// Export

export default TodoStats