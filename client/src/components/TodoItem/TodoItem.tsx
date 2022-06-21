import "./TodoItem.css"
import { useRecoilState, useRecoilValue } from 'recoil'
import { todos_list, current_date } from "../../state/atoms"
import { TodoElement } from "../../state/types"
import { dayMonthYearString } from "../../utility/time"
import Icon from "../assets/Icon"

// —————————————————————————————————————————————————————————————————————————————
// TodoItem

function TodoItem({ id, text, done, due, overdue }: TodoElement) {
  const [todos, setTodos] = useRecoilState(todos_list)
  const now = useRecoilValue(current_date)
  const flipDone = () => setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t))
  const isDone = done ? "done" : ""

  return (
    <div className="TodoItem">
      <span className="left" onClick={flipDone}>
          <Icon>check_box_outline_blank</Icon>
          <Icon className={`checkbox ${isDone}`}>check_box</Icon>
        <span className={`text ${isDone}`}>{text}</span>
      </span>
      <span className={overdue ? "overdue" : ""}>
        { dayMonthYearString(due) }
      </span>
    </div>
  )
}

// —————————————————————————————————————————————————————————————————————————————
// Export

export default TodoItem
