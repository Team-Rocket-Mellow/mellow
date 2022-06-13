import { useRecoilValue, useRecoilState } from "recoil"
import { todos as todos_data } from "../../state/selectors"
import { search } from "../../state/atoms"
import TodoItem from "../TodoItem/TodoItem"

function SearchView() {
   const query = useRecoilValue(search)
   const todos = useRecoilValue(todos_data)
      .filter(todo => todo.text.includes(query))

   return (
      <main>
         <h1>Search: {query}</h1>
         {
            todos.map((t, i) => <TodoItem key={i} {...t} />)
         }
      </main>
   )
}

export default SearchView