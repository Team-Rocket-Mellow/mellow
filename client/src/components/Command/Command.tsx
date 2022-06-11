import { createPortal } from "react-dom"
import React, { useState, useEffect, useRef } from "react"
import { useSetRecoilState, useRecoilState } from "recoil"
import { todos_view, command_is_active, add_is_active } from "../../state/atoms"
import { TodoView } from "../../state/types"
import { Link } from "react-router-dom"
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

function * naturals() { for (let i=0; true; i++) yield i }

function Command({ setOpen }) {
  const [search, setSearch] = useState("")
  const [active, setActive] = useState(0)
  const $nav = useRef<HTMLFormElement>(null)
  const $input = useRef<HTMLInputElement>(null)
  const menu = MenuState().filter(section => section.items.some(
    ({ label }) => label.toLowerCase().includes(search.toLowerCase()))
  )
  const counter = naturals()

  const Δsearch = (Δ) => { setSearch(Δ.target.value), setActive(0) }
  const Δmouse = (Δ:React.MouseEvent) => {
    const $list = document.querySelectorAll("#Command li")
    const index = Array.from($list).indexOf(Δ.currentTarget)
    setActive(index)
  }

  const hotkey = (Δ:React.KeyboardEvent) => {
    const $list = document.querySelectorAll<HTMLElement>("#Command li")
    switch (Δ.key) {
      case "Escape":
        Δ.preventDefault()
        setOpen(false)
        break
      case "Tab":
        if (Δ.shiftKey) {
          Δ.preventDefault()
          setActive(($list.length + active - 1) % $list.length)
          break
        }
      case "ArrowDown":
        Δ.preventDefault()
        setActive((active + 1) % $list.length)
        break
      case "ArrowUp":
        Δ.preventDefault()
        setActive(($list.length + active - 1) % $list.length)
        break
      case "Enter":
        Δ.preventDefault()
        $list[active].click()
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
    <nav id="Command" ref={$nav} onKeyDown={hotkey}>
      <input placeholder="search" value={search} onChange={Δsearch} ref={$input} />
      {
        menu.length
          ? menu.map(({ section, items }) => (
              <menu key={section}>
                <h1>{section}</h1>
                <ul>
                  {
                    items
                      .filter(item => item.label.toLowerCase().includes(search.toLowerCase()))
                      .map(({ label, icon, action }) => {
                        const index = counter.next().value
                        const isActive = active === index ? "active" : ""
                        return (
                          <Link to={section === "Navigate" ? label : ""} key={index!}>
                            <li className={isActive} onClick={action} onMouseEnter={Δmouse}>
                              {icon}
                              <span>{label}</span>
                            </li>
                          </Link>
                        )
                      })
                  }
                </ul>
              </menu>
            ))
          : <menu><h1>No results</h1></menu>
      }
    </nav>
  )
}

// —————————————————————————————————————————————————————————————————————————————
// Export

export default CommandPortal

// https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView