import "./TodoItem.css"
import { useState } from "react"
import { useSetRecoilState, useRecoilValue } from 'recoil'
import { todos_list, current_date } from "../../state/atoms"
import { TodoElement } from "../../state/types"
import { numberToMonth } from "../../utility/time"
import Icon from "../assets/Icon"

// —————————————————————————————————————————————————————————————————————————————
// TodoItem

function TodoItem({ id, text, done, due, overdue }: TodoElement) {
  const [isHover, setHover] = useState(false)
  const setTodos = useSetRecoilState(todos_list)
  const today = useRecoilValue(current_date)

  const isChecked = isHover ? "checkbox checked" : "checkbox"
  const isDone = done ? "done" : ""
  const isOverdue = overdue ? "overdue" : ""
  const [day, month, year] = [due?.getDate(), due?.getMonth(), due?.getFullYear()]

  const flipDone = () => setTodos(todos => todos.map(t => t.id === id ? { ...t, done: !t.done } : t))
  const enter = () => setHover(true)
  const exit = () => setHover(false)

  return (
    <div className={`TodoItem ${isDone}`}>
      <span className="left" onClick={flipDone} onMouseEnter={enter} onMouseLeave={exit}>
        <Icon>{done ? null : "check_box_outline_blank"}</Icon>
        <Icon className="done_boxes">{done ? "check_box" : null}</Icon>
        <Icon className={isChecked}>check_box</Icon>
        <span className="text">{text}</span>
      </span>
      <time className={isOverdue}>
        {day} {month && numberToMonth(month)} {today.year === year || year}
      </time>
    </div>
  )
}

// —————————————————————————————————————————————————————————————————————————————
// Export

export default TodoItem
