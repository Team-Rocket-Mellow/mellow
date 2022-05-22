import "./Modal.css"
import { createPortal } from "react-dom"
import { useState, useEffect, useRef } from "react"
import { useSetRecoilState } from "recoil"
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
    function triggerModal(event:KeyboardEvent) {
      if (!isOpen && event.code === "KeyQ") {
        setOpen(true)
      }
    }
    document.addEventListener("keydown", triggerModal)
    console.log("+ [q]")
  }, [])

  return <>
    { 
      isOpen && createPortal(
        <Modal setOpen={setOpen} />,  
        document.getElementById("portal") as HTMLElement
      ) 
    }
  </>
}

// —————————————————————————————————————————————————————————————————————————————
// Modal

function Modal({ setOpen }) {
  const [input, setInput] = useState("")
  const setTodos = useSetRecoilState(todos_list)
  const formRef = useRef<HTMLFormElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleTyping = (event) => {
    event.preventDefault()
    setInput(event.target.value)
  }
  const submit = (event) => {
    event.preventDefault()
    console.log("submit event: ", input)
    input.length && setTodos(todos => todos.concat(createTodo(input)))
    setOpen(false)
  }

  useEffect(() => {
    const click = (event) => formRef.current && !formRef.current.contains(event.target) && setOpen(false)
    const keydown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "Escape": setOpen(false); break
        case "Tab":
          const group = formRef.current?.querySelectorAll("input[type=text], button") as NonNullable<NodeListOf<HTMLInputElement>>
          const first = group[0]
          const last = group[group.length - 1]
          if (!event.shiftKey && document.activeElement !== first) first.focus(), event.preventDefault()
          else if (event.shiftKey && document.activeElement !== last) last.focus(), event.preventDefault()
      }
    }

    document.addEventListener("click", click)
    document.addEventListener("keydown", keydown)
    console.log("+ [click, escape, tab]")
    return () => {
      document.removeEventListener("click", click)
      document.removeEventListener("keydown", keydown)
      console.log("- [click, escape, tab]")
    }
  }, [formRef])
  
  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 1)
    console.log("input focus effect")
  }, [])

  return (
    <form onSubmit={submit} id="Modal" ref={formRef}>
      <input type="text" value={input} onChange={handleTyping} ref={inputRef} />
      <button type="submit">submit</button>
    </form>
  )
}

// —————————————————————————————————————————————————————————————————————————————
// Export

export default ModalPortal