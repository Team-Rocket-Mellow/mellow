import { useRecoilValue, useRecoilState } from 'recoil'
import { todos_list, Todo } from "../state/atoms"
import { todos_list_filtered } from '../state/selectors'

// —————————————————————————————————————————————————————————————————————————————
// Component

function TodoItem({ id, text, done }: Todo) {
  const [todos, setTodos] = useRecoilState(todos_list)
  const deleteTodo = (id:number) => todos.filter(todo => todo.id !== id)
  const toggleDone = (id:number) => todos.map(todo => todo.id === id ? { ...todo, done: !todo.done } : todo)
  return (
    <div className="TodoItem">
      <span className={done ? "done" : "active"}>{text}</span>
      <button onClick={() => setTodos(toggleDone(id))}>Toggle</button>
      <button onClick={() => setTodos(deleteTodo(id))}>Delete</button>
    </div>
  )
}

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

// —————————————————————————————————————————————————————————————————————————————
// Export

export default TodoList