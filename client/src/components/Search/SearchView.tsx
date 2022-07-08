import { useRecoilValue } from "recoil"
import { todos as todos_data } from "../../state/selectors"
import { search, left_menu } from "../../state/atoms"
import TodoItem from "../TodoItem/TodoItem"
import "./SearchView.css"

function SearchView() {
   const isMenuOn = useRecoilValue(left_menu);
   const query = useRecoilValue(search);
   const todos = useRecoilValue(todos_data)
      .filter(todo => todo.text.toLowerCase().includes(query.toLowerCase()));

   let queryFound = todos.length > 0;

   return (
      <>
      {queryFound ?
         <main id="results-view" className={isMenuOn ? 'open' : 'close'}>
            <h2>{`Results for "${query}"`}</h2>
            {todos.map((t, i) => <TodoItem key={i} {...t} />)}
         </main> :
         <main id="results-view" className={isMenuOn ? 'open' : 'close'}>
            <h2>{`No matches found for "${query}"`}</h2>
      </main>
      }
   </>
   )
}

export default SearchView