import "./Modal.css"
import { createPortal } from "react-dom"
import { useState, useEffect, useRef } from "react"
import { useSetRecoilState } from "recoil"
import { todos_list } from "../../state/atoms"
import { createTodo } from "../../state/actions"
import { Button } from "../assets/Button"

// —————————————————————————————————————————————————————————————————————————————
// Wrapper

/**
 * - sets hotkey `q` to open a modal
 * - creates a portal to render modal outside app hierarchy
 */
function ModalPortal() {
  const [isOpen, setOpen] = useState(false)

  const triggerModal = (Δ:KeyboardEvent) => !isOpen
    && !(document.activeElement instanceof HTMLInputElement)
    && Δ.code === "KeyQ"
    && setOpen(true)

  useEffect(() => document.addEventListener("keydown", triggerModal), [])

  return isOpen && createPortal(
    <Modal setOpen={setOpen} />,
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
  const submit = () => {
    text && setTodos(todos => [...todos, createTodo(text, date)])
    setOpen(false)
  }

  const keydown = (Δ:React.KeyboardEvent) => {
    switch (Δ.key) {
      case "Escape": setOpen(false), Δ.preventDefault(); break
      case "Tab":
        const group = formRef.current!.querySelectorAll("input[type=text], button") as NodeListOf<HTMLElement>
        const first = group[0]
        const last = group[group.length - 1]
        if (!Δ.shiftKey && document.activeElement !== first) first.focus(), Δ.preventDefault()
        else if (Δ.shiftKey && document.activeElement !== last) last.focus(), Δ.preventDefault()
    }
  }

  useEffect(() => {
    const click = (Δ) => formRef.current && !formRef.current.contains(Δ.target) && setOpen(false)
    document.addEventListener("click", click)
    return () => {
      document.removeEventListener("click", click)
    }
  }, [formRef])

  useEffect(() => {setTimeout(() => inputRef.current!.focus(), 1)}, [])

  return (
    <form id="Modal" onSubmit={submit} onKeyDown={keydown} ref={formRef}>
      <input type="date" value={date} onChange={handleDate} />
      <input type="text" value={text} onChange={handleText} placeholder="add todo" ref={inputRef} />
      <Button type="submit" color="gray">submit</Button>
    </form>
  )
}

// —————————————————————————————————————————————————————————————————————————————
// Export

export default ModalPortal