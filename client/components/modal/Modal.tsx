import "./Modal.css"
import { useState, useEffect, useRef, createRef } from "react"
import { useSetRecoilState } from "recoil"
import { todos_list } from "../../state/atoms"
import { createTodo } from "../../state/actions"

// —————————————————————————————————————————————————————————————————————————————
// Component

function Modal() {
  const [input, setInput] = useState("")
  const [due, setDue] = useState("")
  const [isOpen, setOpen] = useState(false)
  const ref = useRef<HTMLDialogElement>(null)
  const setTodos = useSetRecoilState(todos_list)

  function handleTab(e: KeyboardEvent) {
    const group = ref.current?.querySelectorAll(
      "input[type=text], button"
    ) as NonNullable<NodeListOf<HTMLInputElement>>
    if (!e.shiftKey && document.activeElement !== group[0]) {
      group[0].focus()
      return e.preventDefault()
    }
    if (e.shiftKey && document.activeElement !== group[group.length - 1]) {
      group[group.length - 1].focus()
      return e.preventDefault()
    }
  }

  function closeModal() { setOpen(false), setInput(""), setDue("") }

  function submit() {
    return input.length
      ? setTodos(todos => { closeModal(); return todos.concat(createTodo(input, due)) })
      : null
  }

  function hotkey(e: KeyboardEvent) {
    switch (e.code) {
      case "KeyQ": setOpen(true); break
      case "Enter": submit(); break
      case "Escape": closeModal(); break
      case "Tab": handleTab(e); break
    }
  }

  function outsideClick(e) { if (ref.current && !ref.current.contains(e.target)) closeModal() }

  useEffect(() => {
    document.addEventListener("keydown", hotkey)
    return () => document.removeEventListener("keydown", hotkey)
  }, [input])

  useEffect(() => {
    document.addEventListener("click", outsideClick)
    return () => document.removeEventListener("click", outsideClick)
  }, [ref])

  return isOpen
    ? (
      <dialog open={isOpen} id="Modal" ref={ref}>
        <input type="date" value={due} onChange={e => setDue(e.target.value)} />
        <input type="text" value={input} onChange={e => setInput(e.target.value)} autoFocus />
        <button onClick={submit}>add</button>
      </dialog>
    )
    : null
}

// —————————————————————————————————————————————————————————————————————————————
// Export

export default Modal