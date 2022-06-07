import { createPortal } from "react-dom"
import React, { useState, useEffect, useRef, createRef } from "react"
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

type IconMap = { [key in TodoView]: JSX.Element }

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
  const [selected, setSelected] = useState(0)
  const $nav = useRef<HTMLFormElement>(null)
  const $input = useRef<HTMLInputElement>(null)
  const menu_state = MenuState()
  const counter = naturals()

  const Δsearch = (Δ) => setSearch(Δ.target.value)
  const Δmouse = (Δ:React.MouseEvent) => {
    const $list = document.querySelectorAll("#Command li")
    const index = Array.from($list).indexOf(Δ.currentTarget)
    setSelected(index)
  }
  const Δkey = (Δ:React.KeyboardEvent) => {
    const $list = document.querySelectorAll<HTMLElement>("#Command li")
    switch (Δ.key) {
      case "Escape": 
        Δ.preventDefault()
        setOpen(false) 
        break
      case "Tab":
        Δ.preventDefault()
        if (Δ.shiftKey) {
          Δ.preventDefault()
          setSelected(($list.length + selected - 1) % $list.length)
          break
        }
      case "ArrowDown":
        Δ.preventDefault()
        setSelected((selected + 1) % $list.length)
        break
      case "ArrowUp":
        Δ.preventDefault()
        setSelected(($list.length + selected - 1) % $list.length)
        break
      case "Enter":
        Δ.preventDefault()
        $list[selected].click()
        break
    }
  }

  useEffect(() => {
    const click = (Δ) => $nav.current && !$nav.current.contains(Δ.target) && setOpen(false)
    document.addEventListener("click", click)
    return () => document.removeEventListener("click", click)
  }, [$nav])

  useEffect(() => {setTimeout(() => $input.current!.focus(), 1)}, [])

  return (
    <nav id="Command" ref={$nav} onKeyDown={Δkey}>
      <input placeholder="search" value={search} onChange={Δsearch} ref={$input} />
      {
        menu_state.map(({ section, items }) => (
          <menu key={section}>
            <h1>{section}</h1>
            <ul>
              {
                items
                  .filter(({ label }) => label.toLowerCase().includes(search.toLowerCase()))
                  .map(({ label, icon, action }) => {
                    const index = counter.next().value
                    const isActive = selected === index ? "active" : ""
                    return (
                      <li className={isActive} onClick={action} key={label} onMouseEnter={Δmouse}>
                        {icon}
                        <span>{label}</span>
                      </li>
                    )
                  })
              }
            </ul>
          </menu>
        ))
      }
    </nav>
  )
}

export default CommandPortal