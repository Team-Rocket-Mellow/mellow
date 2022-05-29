import "./Modal.css"

import { createPortal } from "react-dom"
import { useState, useEffect, useRef } from "react"
import { useSetRecoilState } from "recoil"
import { CSSTransition } from "react-transition-group"
import { todos_list } from "../../state/atoms"
import { createTodo } from "../../state/actions"

// —————————————————————————————————————————————————————————————————————————————
// Wrapper

/**
 * - sets hotkey `q` to open a modal
 * - creates a portal to render modal outside app hierarchy
 */
function ModalPortal() {
  const [isOpen, setOpen] = useState(false)

  useEffect(() => {
    const triggerModal = (Δ:KeyboardEvent) => !isOpen
      && !(document.activeElement instanceof HTMLInputElement)
      && Δ.code === "KeyQ"
      && setOpen(true)
    document.addEventListener("keydown", triggerModal)
  }, [])

  return isOpen && createPortal(
    <CSSTransition
      in={isOpen}
      timeout={500}
      classNames="modal"
      unmountOnExit
      appear
    >
      <Modal setOpen={setOpen} />
    </CSSTransition>,
    document.getElementById("portal")!
  )
}

// —————————————————————————————————————————————————————————————————————————————
// Modal

function Modal({ setOpen }) {
  const [text, setText] = useState("")
  const [date, setDate] = useState("")
  const setTodos = useSetRecoilState(todos_list)
  const formRef = useRef<HTMLFormElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleText = (Δ) => setText(Δ.target.value)
  const handleDate = (Δ) => setDate(Δ.target.value)
  const submit = (Δ) => {
    Δ.preventDefault()
    text.length && setTodos(todos => [...todos, createTodo(text, date)])
    setOpen(false)
  }

  useEffect(() => {
    const click = (Δ) => formRef.current && !formRef.current.contains(Δ.target) && setOpen(false)
    const keydown = (Δ:KeyboardEvent) => {
      switch (Δ.key) {
        case "Escape": setOpen(false); break
        case "Tab":
          const group = formRef.current!.querySelectorAll("input[type=text], button") as NodeListOf<HTMLInputElement>
          const first = group[0]
          const last = group[group.length - 1]
          if (!Δ.shiftKey && document.activeElement !== first) first.focus(), Δ.preventDefault()
          else if (Δ.shiftKey && document.activeElement !== last) last.focus(), Δ.preventDefault()
      }
    }
    document.addEventListener("click", click)
    document.addEventListener("keydown", keydown)
    return () => {
      document.removeEventListener("click", click)
      document.removeEventListener("keydown", keydown)
    }
  }, [formRef])

  useEffect(() => {setTimeout(() => inputRef.current!.focus(), 1)}, [])

  return (
    <form onSubmit={submit} id="Modal" ref={formRef}>
      <input type="date" value={date} onChange={handleDate} />
      <input type="text" value={text} onChange={handleText} ref={inputRef} />
      <button type="submit">submit</button>
    </form>
  )
}

// —————————————————————————————————————————————————————————————————————————————
// Export

export default ModalPortal