import { createPortal } from "react-dom"
import React, { useState, useEffect, useRef } from "react"
import { useSetRecoilState, useRecoilState } from "recoil"
import { todos_list, todos_view, command_is_active } from "../../state/atoms"
import { TodoView } from "../../state/types"
import Icon from "../assets/Icon"

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

function Command({ isOpen, setOpen }) {
  const [text, setText] = useState("")
  const [view, go] = useRecoilState(todos_view)
  const Δtext = (Δ) => setText(Δ.target.value)
  const navRef = useRef<HTMLFormElement>(null)
  const views:TodoView[] = ["all", "inbox", "today", "upcoming", "done", "trash"]

  useEffect(() => {
    const click = (Δ) => navRef.current && !navRef.current.contains(Δ.target) && setOpen(false)
    document.addEventListener("click", click)
    return () => document.removeEventListener("click", click)
  }, [navRef])

  return (
    <nav>
      <input value={text} onChange={Δtext} />
      <h1>Add</h1>
      <section>
        <li>
          <Icon>search</Icon>
          <span>Add todo</span>
        </li>
      </section>
      <section>
        <h1>Navigate</h1>
        {
          views.map((view, i) => (
            <li key={i} onClick={() => go(view)}>
              <Icon>{view}</Icon>
              <span>Go {view}</span>
            </li>
          ))
        }
      </section>
    </nav>
  )
}

export default CommandPortal