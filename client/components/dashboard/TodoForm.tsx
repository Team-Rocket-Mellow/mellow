import { useState } from "react"
import { useSetRecoilState } from "recoil"
import { todos_list, Todo } from "../../state/atoms"
import { createTodo } from "../../state/actions"

// —————————————————————————————————————————————————————————————————————————————
// Component

function TodoForm() {
  const [input, setInput] = useState("")
  const [due, setDue] = useState("")
  const [isFormVisible, toggleFormVisible] = useState(true)
  const setTodos = useSetRecoilState(todos_list)

  const onClick = () => input.length
    ? setTodos(state => {
        setInput("")
        setDue("")
        return state.concat(createTodo(input, due))
      })
    : null

  const showTextbox = () => toggleFormVisible(textbox => !textbox)

  return (
    <div id="TodoForm">
      {
        isFormVisible
          ? <button onClick={showTextbox}>add task</button>
          : <>
              <input type="date" id="due" value={due} onChange={e => setDue(e.target.value)} />
              <input value={input} onChange={e => setInput(e.target.value)} />
              <button onClick={onClick}>add</button>
              <button onClick={showTextbox}>close</button>
            </>
      }
    </div>
  )
}

// —————————————————————————————————————————————————————————————————————————————
// Export

export default TodoForm