import "./TodoItem.css"
import { useRecoilValue, useRecoilState } from 'recoil'
import { todos_list, todos_view, Todo } from "../../state/atoms"

// —————————————————————————————————————————————————————————————————————————————
// TodoItem

function TodoItem({ id, text, done, due }: Todo) {
  const [todos, setTodos] = useRecoilState(todos_list)
  const view = useRecoilValue(todos_view)
  const toggleTrash = () => setTodos(todos.map(todo => todo.id === id ? { ...todo, trash: !todo.trash } : todo))
  const deleteTodo = () => setTodos(todos.filter(todo => todo.id !== id))
  const toggleDone = () => setTodos(todos.map(todo => todo.id === id ? { ...todo, done: !todo.done } : todo))

  return (
    <div className="TodoItem">
      <span className={done ? "done" : "active"} onClick={toggleDone}>
        {text}
      </span>
      <span>
        ({ due?.toJSON()?.slice(0, 10) ?? "∞"})
      </span>
    </div>
  )
}

// —————————————————————————————————————————————————————————————————————————————
// Export

export default TodoItem