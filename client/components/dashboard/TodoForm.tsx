import { useState } from "react"
import { useSetRecoilState } from "recoil"
import { todos_list } from "../../state/atoms"

// —————————————————————————————————————————————————————————————————————————————
// Environment

function * generate_ids() { for (let i=0; true; i++) yield i }
const ids = generate_ids()

// —————————————————————————————————————————————————————————————————————————————
// Component

function TodoForm() {
  const [input, setInput] = useState("")
  const [due, setDue] = useState(new Date().toISOString())
  const [isFormVisible, toggleFormVisible] = useState(true)
  const setTodos = useSetRecoilState(todos_list)

  const onClick = () => input.length
    ? setTodos(state => {
        setInput("")
        setDue("")
        return state.concat({
          id: ids.next().value as number,
          text: input,
          done: false,
          trash: false,
          start: new Date(),
          due: null,
          pending: false,
        })
      })
    : null

  const showTextbox = () => toggleFormVisible(textbox => !textbox)

  return (
    <div id="TodoForm">
      { isFormVisible
        ? <button onClick={showTextbox}>+ add task</button>
        : (
            <>
              <input type="date" id="due" value={due} onChange={e => setDue(e.target.value)} />
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