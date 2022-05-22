import "./Modal.css"
import { createPortal } from "react-dom"
import { useState, useEffect, useRef } from "react"
import { useSetRecoilState } from "recoil"
import { todos_list } from "../../state/atoms"
import { createTodo } from "../../state/actions"

// —————————————————————————————————————————————————————————————————————————————
// Wrapper

function ModalWrapper() {
   const [isOpen, setOpen] = useState(false)

   useEffect(() => {
      const triggerModal = (e) => !isOpen && e.code === "KeyQ" && setOpen(true)
      document.addEventListener("keydown", triggerModal)
      console.log("+ [q]")
   }, [])

   return (
      <div className="ModalWrapper">
         { isOpen && <Modal setOpen={setOpen} /> }
      </div>
   )
}

// —————————————————————————————————————————————————————————————————————————————
// Modal

function Modal({ setOpen }) {
   const [input, setInput] = useState("")
   const setTodos = useSetRecoilState(todos_list)
   const ref = useRef<HTMLFormElement>(null)

   const handleTyping = Δ => setInput(Δ.target.value)
   const submit = Δ => {
      Δ.preventDefault()
      console.log("submit event: ", input)
      input.length && setTodos(todos => todos.concat(createTodo(input)))
      setOpen(false)
   }
   useEffect(() => {
      const click = Δ => ref.current && !ref.current.contains(Δ.target) && setOpen(false)
      function keydown(Δ: KeyboardEvent) {
         switch (Δ.key) {
            case "Escape": setOpen(false); break
            case "Tab":
               const group = ref.current?.querySelectorAll("input[type=text], button") as NonNullable<NodeListOf<HTMLInputElement>>
               const first = group[0]
               const last = group[group.length - 1]
               if (!Δ.shiftKey && document.activeElement !== first) first.focus(), Δ.preventDefault()
               else if (Δ.shiftKey && document.activeElement !== last) last.focus(), Δ.preventDefault()
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
   }, [ref])

   return createPortal(
      <form onSubmit={submit} id="Modal" ref={ref}>
         <input type="text" value={input} onChange={handleTyping} autoFocus />
         <button type="submit">submit</button>
      </form>,
      document.getElementById("portal") as HTMLElement
   )
}

// —————————————————————————————————————————————————————————————————————————————
// Export

export default ModalWrapper