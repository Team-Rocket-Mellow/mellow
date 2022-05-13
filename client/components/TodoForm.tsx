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
   const [textbox, setTextbox] = useState(true)
   const setTodos = useSetRecoilState(todos_list)

   const onClick = () => input.length ? setTodos(state => {
      setInput("")
      return state.concat({
         id: ids.next().value as number,
         text: input,
         done: false,
      })
   }) : null

   const showTextbox = () => {
      setTextbox(textbox => !textbox)
   }

   return (
      <div id="TodoForm">
         { textbox
            ? <button onClick={showTextbox}>+ Add Task</button>
            : (
                  <>
                     <input value={input} onChange={e => setInput(e.target.value)} />
                     <button onClick={onClick}>add</button>
                     <button onClick={showTextbox}>close</button>
                  </>
               )
         }
      </div>
   )
}

// —————————————————————————————————————————————————————————————————————————————
// Export

export default TodoForm