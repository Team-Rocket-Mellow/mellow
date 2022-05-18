import "./Modal.css"
import { useState, useEffect } from "react"
import { useSetRecoilState } from "recoil"
import { todos_list } from "../../state/atoms"
import { createTodo } from "../../state/actions"

// —————————————————————————————————————————————————————————————————————————————
// Component

function Modal() {
  const [input, setInput] = useState("")
  const [due, setDue] = useState("")
  const [isOpen, setOpen] = useState(false)
  const setTodos = useSetRecoilState(todos_list)

  function closeModal() { setOpen(false), setInput(""), setDue("") }

  function submit() {
    return input.length
      ? setTodos(todos => { closeModal(); return todos.concat(createTodo(input, due)) })
      : null
  }

  function hotkey(e) {
    switch (e.code) {
      case "Enter": submit(); break
      case "Escape": closeModal()
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", hotkey)
    return () => document.removeEventListener("keydown", hotkey)
  }, [])

  useEffect(() => {
    document.addEventListener("keydown", e => {
      if (e.code === "KeyQ") setOpen(true)
    })
  }, [])

  return true
    ? (
      <dialog open={isOpen} id="Modal">
        <input type="date" value={due} onChange={e => setDue(e.target.value)} />
        <input value={input} onChange={e => setInput(e.target.value)} autoFocus />
        <button onClick={submit}>add</button>
      </dialog>
    )
    : null
}

// —————————————————————————————————————————————————————————————————————————————
// Export

export default Modal