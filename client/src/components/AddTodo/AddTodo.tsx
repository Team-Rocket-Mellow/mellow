import "./AddTodo.css"
import { createPortal } from "react-dom"
import React, { useState, useEffect, useRef } from "react"
import { useSetRecoilState, useRecoilState } from "recoil"
import { todos_list, add_is_active } from "../../state/atoms"
import { createTodo } from "../../state/actions"
import Button from "../assets/Button"

// —————————————————————————————————————————————————————————————————————————————
// Hook

function useDelayUnmount(isOpen:boolean, delayTime:number) {
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    let timeoutId:ReturnType<typeof setTimeout>

    if (isOpen && !shouldRender) setShouldRender(true)
    else if (!isOpen && shouldRender) timeoutId = setTimeout(() => {
      setShouldRender(false)
      console.log("unmounted")
    }, delayTime)

    return () => clearTimeout(timeoutId)
  }, [isOpen, delayTime, shouldRender])

  return shouldRender
}

// —————————————————————————————————————————————————————————————————————————————
// Wrapper

/**
 * - sets hotkey `q` to open a modal
 * - creates a portal to render modal outside app hierarchy
 */
function ModalPortal() {
  const [isOpen, setOpen] = useRecoilState(add_is_active)
  const shouldRenderChild = useDelayUnmount(isOpen, 199)

  const triggerModal = (Δ:KeyboardEvent) => !isOpen
    && !(document.activeElement instanceof HTMLInputElement)
    && Δ.code === "KeyQ"
    && setOpen(true)

  useEffect(() => document.addEventListener("keydown", triggerModal), [])

  return shouldRenderChild && createPortal(
    <Modal setOpen={setOpen} isOpen={isOpen} />,
    document.getElementById("portal")!
  )
}

// —————————————————————————————————————————————————————————————————————————————
// Modal

function Modal({ setOpen, isOpen }) {
  const [text, setText] = useState("")
  const [date, setDate] = useState("")
  const setTodos = useSetRecoilState(todos_list)
  const $form = useRef<HTMLFormElement>(null)
  const $input = useRef<HTMLInputElement>(null)

  const handleText = (Δ) => setText(Δ.target.value)
  const handleDate = (Δ) => setDate(Δ.target.value)
  const submit = (Δ) => {
    if (text) setTodos(todos => [...todos, createTodo(text, date)])
    setOpen(false)
    Δ.preventDefault()
  }
  const keydown = (Δ:React.KeyboardEvent) => {
    switch (Δ.key) {
      case "Escape": setOpen(false), Δ.preventDefault(); break
      case "Tab":
        const group = $form.current!.querySelectorAll("input[type=text], button") as NodeListOf<HTMLElement>
        const first = group[0]
        const last = group[group.length - 1]
        if (!Δ.shiftKey && document.activeElement !== first) Δ.preventDefault(), first.focus()
        else if (Δ.shiftKey && document.activeElement !== last) Δ.preventDefault(), last.focus()
    }
  }

  useEffect(() => {
    const click = (Δ) => $form.current && !$form.current.contains(Δ.target) && setOpen(false)
    document.addEventListener("click", click)
    return () => document.removeEventListener("click", click)
  }, [$form])

  useEffect(() => {setTimeout(() => $input.current!.focus(), 1)}, [])

  const outro = isOpen ? undefined : { animation: "exit 200ms linear" }

  return (
    <form id="Modal" onSubmit={submit} onKeyDown={keydown} ref={$form} style={outro}>
      <input type="date" value={date} onChange={handleDate} />
      <input type="text" value={text} onChange={handleText} placeholder="add todo" ref={$input} />
      <Button type="submit" color="gray">submit</Button>
    </form>
  )
}

// —————————————————————————————————————————————————————————————————————————————
// Export

export default ModalPortal