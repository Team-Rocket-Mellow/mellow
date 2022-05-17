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
   const [isOpen, setOpen] = useState(true)
   const setTodos = useSetRecoilState(todos_list)

   const onClick = () => input.length
      ? setTodos(state => {
         setInput("")
         setDue("")
         setOpen(false)
         return state.concat(createTodo(input, due))
      })
      : null
   
   function keyHandler(e) {
      switch (e.code) {
         case "Enter": return onClick()
         case "Escape": return setOpen(false)
      }
   }

   useEffect(() => {  
      document.addEventListener("keydown", keyHandler)  
      return () => document.removeEventListener("keydown", keyHandler)
   });

   return (
      <>
         <button onClick={() => setOpen(true)}>show dialog</button>
         <dialog open={isOpen}>
            <input type="date" value="" onChange={e => setDue(e.target.value)} />
            <input value={input} onChange={e => setInput(e.target.value)} />
            <button onClick={onClick}>add</button>
         </dialog>
      </>
   )
}

// —————————————————————————————————————————————————————————————————————————————
// Export

export default Modal