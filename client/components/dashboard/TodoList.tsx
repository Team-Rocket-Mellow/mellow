import { useRecoilValue, useRecoilState } from 'recoil'
import { todos_list, todos_view, Todo } from "../../state/atoms"
import { todos_list_filtered } from '../../state/selectors'

// —————————————————————————————————————————————————————————————————————————————
// Component

function TodoList() {
  const todos = useRecoilValue(todos_list_filtered)
  const view = useRecoilValue(todos_view)
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
  const view = useRecoilValue(todos_view)
  const toggleTrash = () => setTodos(todos.map(todo => todo.id === id ? { ...todo, trash: !todo.trash } : todo))
  const deleteTodo = () => setTodos(todos.filter(todo => todo.id !== id))
  const toggleDone = () => setTodos(todos.map(todo => todo.id === id ? { ...todo, done: !todo.done } : todo))
  return (
    <div className="TodoItem">
      <span className={done ? "done" : "active"} onClick={toggleDone}>
        {text} ({ due?.toJSON()?.slice(0, 10) ?? "∞"})
      </span>
      {
        view === "trash"
        ? <>
            <button onClick={toggleTrash}>untrash</button>
            <button onClick={deleteTodo}>delete</button>
          </>
        : <button onClick={toggleTrash}>trash</button>
      }
    </div>
  )
}

// —————————————————————————————————————————————————————————————————————————————
// Export

export default TodoList