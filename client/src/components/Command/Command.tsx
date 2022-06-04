import { createPortal } from "react-dom"
import React, { useState, useEffect, useRef } from "react"
import { useSetRecoilState, useRecoilState } from "recoil"
import { todos_list, todos_view, command_is_active } from "../../state/atoms"
import { TodoView } from "../../state/types"
import Icon from "../assets/Icon"
import "./Command.css"

// —————————————————————————————————————————————————————————————————————————————
// Wrapper

/**
 * - sets hotkey `k` to open a command modal
 * - creates a portal to render modal outside app hierarchy
 */
function CommandPortal() {
  const [isOpen, setOpen] = useRecoilState(command_is_active)

  const triggerModal = (Δ:KeyboardEvent) => !isOpen
    && !(document.activeElement instanceof HTMLInputElement)
    && Δ.code === "KeyK"
    && setOpen(true)

  useEffect(() => document.addEventListener("keydown", triggerModal), [])

  return isOpen && createPortal(
    <Command setOpen={setOpen} isOpen={isOpen} />,
    document.getElementById("portal")!
  )
}

// —————————————————————————————————————————————————————————————————————————————
// Command

const icons = {
  all:      <Icon>apps</Icon>,
  inbox:    <Icon className="inbox">inbox</Icon>,
  today:    <Icon className="today">today</Icon>,
  upcoming: <Icon className="upcoming">event_upcoming</Icon>,
  done:     <Icon className="done">task_alt</Icon>,
  trash:    <Icon className="trash">delete</Icon>,
}

function Command({ isOpen, setOpen }) {
  const [text, setText] = useState("")
  const [view, go] = useRecoilState(todos_view)
  const Δtext = (Δ) => setText(Δ.target.value)
  const navRef = useRef<HTMLFormElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const views:TodoView[] = ["all", "inbox", "today", "upcoming", "done", "trash"]

  const keydown = (Δ:React.KeyboardEvent) => {
    switch (Δ.key) {
      case "Escape": setOpen(false); break
    }
  }

  useEffect(() => {
    const click = (Δ) => navRef.current && !navRef.current.contains(Δ.target) && setOpen(false)
    document.addEventListener("click", click)
    return () => document.removeEventListener("click", click)
  }, [navRef])

  useEffect(() => {setTimeout(() => inputRef.current!.focus(), 1)}, [])

  return (
    <nav id="Command" ref={navRef} onKeyDown={keydown}>
      <input value={text} onChange={Δtext} ref={inputRef} />
      <menu id="todo_add">
        <h1>Add</h1>
        <li>
          <Icon>add</Icon>
          <span>Add todo</span>
        </li>
      </menu>
      <menu id="navigate">
        <h1>Navigate</h1>
        {
          views
            .filter(view => view.includes(text))
            .map((view, i) => (
              <li key={i} onClick={() => go(view)}>
                {icons[view]}
                <span>Go {view}</span>
              </li>
            ))
        }
      </menu>
    </nav>
  )
}

export default CommandPortal