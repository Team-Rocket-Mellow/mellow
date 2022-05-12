import { useState } from "react"
import { useSetRecoilState } from "recoil"
import { todos_list } from "../state/atoms"

// —————————————————————————————————————————————————————————————————————————————
// Environment

function * generate_ids() { for (let i=0; true; i++) yield i }
const ids = generate_ids()

// —————————————————————————————————————————————————————————————————————————————
// Component

function TodoForm() {
   const [input, setInput] = useState("")
   const setTodos = useSetRecoilState(todos_list)

   const onClick = () => setTodos(state => {
      setInput("")
      return state.concat({
         id: ids.next().value as number,
         text: input,
         done: false,
      })
   })

   return (
      <div id="TodoForm">
         <input value={input} onChange={e => setInput(e.target.value)} />
         <button onClick={onClick}>Add</button>
      </div>
   )
}

// —————————————————————————————————————————————————————————————————————————————
// Export

export default TodoForm