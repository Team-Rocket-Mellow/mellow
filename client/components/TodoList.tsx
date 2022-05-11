import { useAppSelector } from "../state/selectors"

function TodoList() {
  const todos = useAppSelector(state => state.todos)
  console.log(`todos: `, todos)
  return (
    <>
      {
        todos.map(
          (todo, index) => (
            <div key={index}>
              {todo.text}
            </div>
          )
        )
      }
    </>
  )
}

export default TodoList