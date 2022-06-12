import { useRecoilValue, useRecoilState } from "recoil"
import { todos as todos_data } from "../../state/selectors"
import { search } from "../../state/atoms"
import { TodoElement } from "../../state/types"

function SearchInput() {
   const [text, setText] = useRecoilState(search)
   const Δtext = (Δ) => setText(Δ.target.value)
   const clearText = () => setText("")
   return (
      <input
         placeholder='/  to search'
         type='search'
         tabIndex={-1}
         value={text}
         onChange={Δtext}
         onBlur={clearText}
      />
   )
}

function SearchView() {
   const text = useRecoilValue(search)
   const todos = useRecoilValue(todos_data)
   return (
      <main>
         <h1>Search</h1>

      </main>
   )
}