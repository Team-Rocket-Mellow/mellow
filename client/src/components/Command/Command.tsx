import { createPortal } from "react-dom"
import React, { useState, useEffect, useRef, } from "react"
import { useSetRecoilState, useRecoilState } from "recoil"
import { todos_view, command_is_active, add_is_active } from "../../state/atoms"
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
    <Command setOpen={setOpen} />,
    document.getElementById("portal")!
  )
}

// —————————————————————————————————————————————————————————————————————————————
// Menu Representation

const icons: { [key in TodoView]: React.ReactNode } = {
  all:      <Icon>apps</Icon>,
  inbox:    <Icon className="inbox">inbox</Icon>,
  today:    <Icon className="today">today</Icon>,
  upcoming: <Icon className="upcoming">event_upcoming</Icon>,
  done:     <Icon className="done">task_alt</Icon>,
  trash:    <Icon className="trash">delete</Icon>,
}

function MenuState() {
  const go = useSetRecoilState(todos_view)
  const openAddTodo = useSetRecoilState(add_is_active)
  const closeCommand = useSetRecoilState(command_is_active)

  const menu_data = [
    {
      section: "Add",
      items: [
        {
          label: "Add todo",
          icon: <Icon>add</Icon>,
          action: () => {
            openAddTodo(true)
            closeCommand(false)
          },
        },
      ],
    },
    {
      section: "Navigate",
      items: Object.entries(icons).map(([view, icon]) => ({
        label: view,
        icon,
        action: () => {
          go(view as TodoView)
          closeCommand(false)
        },
      })),
    },
  ]

  return menu_data
}

// —————————————————————————————————————————————————————————————————————————————
// Constituents

function dataToMenus({ section, items }) {
  return (
    <menu key={section}>
      <h1>{section}</h1>
      <ul>
        { items.map(menuToItems) }
      </ul>
    </menu>
  )
}

function menuToItems({ label, icon, action }) {
  return (
    <li onClick={action} key={label}>
      {icon}
      <span>{label}</span>
    </li>
  )
}

// —————————————————————————————————————————————————————————————————————————————
// Command

function Command({ setOpen }) {
  const [search, setSearch] = useState("")
  const navRef = useRef<HTMLFormElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const menu_state = MenuState()

  const Δsearch = (Δ) => setSearch(Δ.target.value)
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
      <input value={search} onChange={Δsearch} ref={inputRef} />
      { 
        menu_state
          .map(dataToMenus) 
      }
    </nav>
  )
}

export default CommandPortal