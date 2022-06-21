import "./TodoItem.css"
import { useState } from "react"
import { useRecoilState, useRecoilValue } from 'recoil'
import { todos_list, current_date } from "../../state/atoms"
import { TodoElement } from "../../state/types"
import { dayMonthYearString } from "../../utility/time"
import Icon from "../assets/Icon"

// —————————————————————————————————————————————————————————————————————————————
// TodoItem

function TodoItem({ id, text, done, due, overdue }: TodoElement) {
  const [todos, setTodos] = useRecoilState(todos_list)
  const [isHover, setHover] = useState(false)
  const now = useRecoilValue(current_date)
  const itemClass = done ? "done left" : "active left"
  const flipDone = () => setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t))
  const enter = () => setHover(true)
  const exit = () => setHover(false)

  return (
    <div className="TodoItem">
      <span className={itemClass} onClick={flipDone}>
          <Icon>check_box_outline_blank</Icon>
          <Icon className={`checkbox ${done ? "done" : ""}`}>check_box</Icon>
        <span className="text">{text}</span>
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
