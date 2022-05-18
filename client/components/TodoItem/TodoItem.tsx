import "./TodoItem.css"
import { useState } from "react"
import { useRecoilValue, useRecoilState } from 'recoil'
import { todos_list, todos_view, Todo } from "../../state/atoms"

// —————————————————————————————————————————————————————————————————————————————
// TodoItem

function TodoItem({ id, text, done, due }: Todo) {
  const [todos, setTodos] = useRecoilState(todos_list)
  const [isHover, setHover] = useState(false)
  const view = useRecoilValue(todos_view)
  const toggleTrash = () => setTodos(todos.map(todo => todo.id === id ? { ...todo, trash: !todo.trash } : todo))
  const deleteTodo = () => setTodos(todos.filter(todo => todo.id !== id))
  const toggleDone = () => setTodos(todos.map(todo => todo.id === id ? { ...todo, done: !todo.done } : todo))

  return (
    <div className="TodoItem">
      <span className={done ? "done left" : "active left"} onClick={toggleDone}>
        <i
          className="material-symbols-rounded"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          { done || isHover ? "check_box" : "check_box_outline_blank" }
        </i>
        <span className="text">{text}</span>
      </span>
      <span>
        { due?.toJSON()?.slice(0, 10) ?? "∞" }
      </span>
    </div>
  )
}

// —————————————————————————————————————————————————————————————————————————————
// Export

export default TodoItem