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
        todos.map((todo, i) => <TodoItem key={i} {...todo} />)
      }
    </ul>
  )
}

function TodoItem({ id, text, done, due }: Todo) {
  const [todos, setTodos] = useRecoilState(todos_list)
  const trashTodo = () => setTodos(todos.map(todo => todo.id === id ? { ...todo, trash: true } : todo))
  const toggleDone = () => setTodos(todos.map(todo => todo.id === id ? { ...todo, done: !todo.done } : todo))
  return (
    <div className="TodoItem">
      <span className={done ? "done" : "active"} onClick={toggleDone}>{text} ({ due?.toJSON()?.slice(0, 10) ?? "∞"})</span>
      <button onClick={trashTodo}>trash</button>
    </div>
  )
}

// —————————————————————————————————————————————————————————————————————————————
// Export

export default TodoList