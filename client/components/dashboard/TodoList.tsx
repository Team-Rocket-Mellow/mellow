import { useRecoilValue, useRecoilState } from 'recoil'
import { todos_list, Todo } from "../../state/atoms"
import { todos_list_filtered } from '../../state/selectors'

// —————————————————————————————————————————————————————————————————————————————
// Component

function TodoList() {
  const todos = useRecoilValue(todos_list_filtered)
  return (
    <ul id="TodoList">
      {
        todos.map(todo => <TodoItem key={todo.id} {...todo} />)
      }
    </ul>
  )
}

function TodoItem({ id, text, done }: Todo) {
  const [todos, setTodos] = useRecoilState(todos_list)
  const deleteTodo = () => setTodos(todos.filter(todo => todo.id !== id))
  const toggleDone = () => setTodos(todos.map(todo => todo.id === id ? { ...todo, done: !todo.done } : todo))
  return (
    <div className="TodoItem">
      <span className={done ? "done" : "active"} onClick={toggleDone}>{text}</span>
      <button onClick={deleteTodo}>Delete</button>
    </div>
  )
}

// —————————————————————————————————————————————————————————————————————————————
// Export

export default TodoList