import { useRecoilValue, useRecoilState } from "recoil"
import { todos as todos_data } from "../../state/selectors"
import { search } from "../../state/atoms"
import { useNavigate } from "react-router-dom"

function SearchView() {
   const text = useRecoilValue(search)
   const todos = useRecoilValue(todos_data)
   return (
      <main>
         <h1>Search</h1>

      </main>
   )
}

export default SearchView