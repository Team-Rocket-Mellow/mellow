import "./TodoItem.css"
import { useState } from "react"
import { useRecoilState, useRecoilValue } from 'recoil'
import { todos_list, current_date } from "../../state/atoms"
import { TodoElement } from "../../state/types"
import { dayMonthYear } from "../../utility/time"

// —————————————————————————————————————————————————————————————————————————————
// TodoItem

function TodoItem({ id, text, done, due, overdue }: TodoElement) {
  const [todos, setTodos] = useRecoilState(todos_list)
  const [isHover, setHover] = useState(false)
  const now = useRecoilValue(current_date)
  const itemClass = done ? "done left" : "active left"
  const flipDone = () => setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t))

  return (
    <div className="TodoItem">
      <span className={itemClass} onClick={flipDone}>
        <i
          className="material-symbols-rounded"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          { done || isHover ? "check_box" : "check_box_outline_blank" }
        </i>
        <span className="text">{text}</span>
      </span>
      <span className={overdue ? "overdue" : ""}>
        { due?.toJSON()?.slice(0, 10) ?? "∞" }
      </span>
    </div>
  )
}

// —————————————————————————————————————————————————————————————————————————————
// Export

export default TodoItem