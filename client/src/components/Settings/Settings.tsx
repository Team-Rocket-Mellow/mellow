import "./Settings.css"
import { useEffect, useState, useRef } from "react"
import { createPortal } from "react-dom"
import { TodoView, Theme, } from "../../state/types"
import {
  setting_is_active,
  theme as $theme,
  home as $home
} from "../../state/atoms"
import { useRecoilState } from "recoil"
import Button from "../assets/Button"

// —————————————————————————————————————————————————————————————————————————————
// Hook

function useDelayUnmount(isOpen:boolean, delayBy:number) {
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    let timeoutId:ReturnType<typeof setTimeout>

    if (isOpen && !shouldRender) setShouldRender(true)
    else if (!isOpen && shouldRender) timeoutId = setTimeout(() => setShouldRender(false), delayBy)

    return () => clearTimeout(timeoutId)
  }, [isOpen, delayBy, shouldRender])

  return shouldRender
}

// —————————————————————————————————————————————————————————————————————————————
// Wrapper

function SettingsPortal() {
  const [isOpen, setOpen] = useRecoilState(setting_is_active)
  const shouldRenderChild = useDelayUnmount(isOpen, 199)

  return shouldRenderChild && createPortal(
    <Settings {...{setOpen, isOpen}} />,
    document.getElementById("portal")!
  )
}

// —————————————————————————————————————————————————————————————————————————————
// Settings

function Settings({ setOpen, isOpen }) {
  const [theme, setTheme] = useRecoilState($theme)
  const [home, setHome] = useRecoilState($home)
  const $Settings = useRef<HTMLFormElement>(null)
  const settings = [
    {
      name: "Theme",
      options: ["auto", "light", "dark", "contrast"] as Theme[],
      value: theme,
      onChange: (e:React.ChangeEvent<HTMLSelectElement>) => setTheme(e.target.value as Theme)
    },
    {
      name: "Home",
      about: "The default view.",
      options: ["all", "inbox", "today", "upcoming", "done", "trash"] as TodoView[],
      value: home,
      onChange: (e:React.ChangeEvent<HTMLSelectElement>) => setHome(e.target.value as TodoView)
    },
  ]

  const hotkey = (Δ:KeyboardEvent) => {
    switch (Δ.key) {
      case "Escape":
        Δ.preventDefault()
        setOpen(false)
        break
    }
  }

  useEffect(() => {
    const click = (Δ) => !$Settings.current?.contains(Δ.target) && setOpen(false)
    document.addEventListener("click", click)
    return () => document.removeEventListener("click", click)
  }, [$Settings])

  useEffect(() => {
    document.addEventListener("keydown", hotkey)
    return () => document.removeEventListener("keydown", hotkey)
  })

  return (
    <div id="ModalBackground">
      <form ref={$Settings} id="Settings" className={isOpen ? "enter" : "exit"}>
        <h2>Settings</h2>
        {
          settings.map(({ name, about, options, value, onChange }, i) => (
            <fieldset key={i}>
              <label htmlFor={name}>{name}</label>
              <select {...{name, onChange, value}}>
                { options.map((o, i) => <option value={o} key={i}>{o}</option>) }
              </select>
            </fieldset>
          ))
        }
        <Button color="gray">Save</Button>
      </form>
    </div>
  )
}

// —————————————————————————————————————————————————————————————————————————————
// Export

export default SettingsPortal