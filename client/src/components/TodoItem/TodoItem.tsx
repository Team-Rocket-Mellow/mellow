import "./TodoItem.css"
import { useState } from "react"
import { useSetRecoilState } from 'recoil'
import { todos_list } from "../../state/atoms"
import { TodoElement } from "../../state/types"
import { dayMonthYearString } from "../../utility/time"
import Icon from "../assets/Icon"

// —————————————————————————————————————————————————————————————————————————————
// TodoItem

function TodoItem({ id, text, done, due, overdue }: TodoElement) {
  const setTodos = useSetRecoilState(todos_list)
  const [isHover, setHover] = useState(false)
  const isChecked = done || isHover ? "done" : ""

  const flipDone = () => setTodos(todos => todos.map(t => t.id === id ? { ...t, done: !t.done } : t))
  const enter = () => setHover(true)
  const exit = () => setHover(false)

  return (
    <div className="TodoItem">
      <span 
        className="left" 
        onClick={flipDone} 
        onMouseEnter={enter}
        onMouseLeave={exit}
      >
        <Icon>check_box_outline_blank</Icon>
        <Icon className={`checkbox ${isChecked}`}>check_box</Icon>
        <span className={`text ${done && "done"}`}>{text}</span>
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
