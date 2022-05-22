import "./Modal.css"
import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { useSetRecoilState } from "recoil"
import { todos_list } from "../../state/atoms"
import { createTodo } from "../../state/actions"

// —————————————————————————————————————————————————————————————————————————————
// Component

function ModalWrapper() {
   const [isOpen, setOpen] = useState(false)
   const triggerModal = (e) => !isOpen && e.code === "KeyQ" && setOpen(true)
   useEffect(() => {
      document.addEventListener("keydown", triggerModal)
      console.log("+ Q")
   }, [])

   return (
      <div className="ModalWrapper">
         { isOpen && <Modal setOpen={setOpen} isOpen={isOpen} /> }
      </div>
   )
}

function Modal({ isOpen, setOpen }) {
   const [input, setInput] = useState("")
   const setTodos = useSetRecoilState(todos_list)
   const handleTyping = (e) => setInput(e.target.value)
   const submit = () => {
      console.log("submit event: ", input)
      input.length && setTodos(todos => todos.concat(createTodo(input)))
      closeModal()
   }
   const closeModal = () => { setOpen(false), setInput("") }
   const handleEsc = (e) => e.key === "Escape" && setOpen(false)
   const handleEnter = (e) => e.key === "Enter" && submit()

   useEffect(() => {
      document.addEventListener("keydown", handleEsc)
      console.log("+ Esc")
      return () => {
         document.removeEventListener("keydown", handleEsc)
         console.log("- Esc")
      }
   }, [isOpen])

   useEffect(() => {
      document.addEventListener("keydown", handleEnter)
      console.log("+ Enter")
      return () => {
         document.removeEventListener("keydown", handleEnter)
         console.log("- Enter")
      }
   }, [input])

   return createPortal(
      <dialog open={isOpen}>
         <input type="text" value={input} onChange={handleTyping} autoFocus />
         <button onClick={submit}>submit</button>
      </dialog>,
      document.getElementById("portal") as HTMLElement
   )
}

export default ModalWrapper