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

type IconMap = { [key in TodoView]: React.ReactNode }

const icons:IconMap = {
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
// Command

function * naturals() { for (let i = 0; ; i++) yield i }

function Command({ setOpen }) {
  const [search, setSearch] = useState("")
  const $nav = useRef<HTMLFormElement>(null)
  const $input = useRef<HTMLInputElement>(null)
  const menu_state = MenuState()

  const Δsearch = (Δ) => setSearch(Δ.target.value)
  const keydown = (Δ:React.KeyboardEvent) => {
    switch (Δ.key) {
      case "Escape": setOpen(false); break
    }
  }

  useEffect(() => {
    const click = (Δ) => $nav.current && !$nav.current.contains(Δ.target) && setOpen(false)
    document.addEventListener("click", click)
    return () => document.removeEventListener("click", click)
  }, [$nav])

  useEffect(() => {setTimeout(() => $input.current!.focus(), 1)}, [])

  const counter = naturals()

  return (
    <nav id="Command" ref={$nav} onKeyDown={keydown}>
      <input placeholder="search" value={search} onChange={Δsearch} ref={$input} />
      {
        menu_state.map(({ section, items }) => (
          <menu key={section}>
            <h1>{section}</h1>
            <ul>
              {
                items.map(({ label, icon, action }) => (
                  <li onClick={action} key={label}>
                    {icon}
                    <span>{label}</span>
                  </li>
                ))
              }
            </ul>
          </menu>
        ))
      }
    </nav>
  )
}

export default CommandPortal