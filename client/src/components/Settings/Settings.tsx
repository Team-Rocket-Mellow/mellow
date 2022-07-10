import "./Settings.css"
import { TodoView, Theme, } from "../../state/types"
import { setting_is_active, theme, home } from "../../state/atoms"
import { useRecoilState } from "recoil"
import { useEffect, } from "react"
import { createPortal } from "react-dom"

// —————————————————————————————————————————————————————————————————————————————
// Environment

type Settings = {
  theme: Theme
  home: TodoView
}

const themes:Theme[] = ["auto", "light", "dark", "contrast"]
const views:TodoView[] = ["all", "inbox", "today", "upcoming", "done", "trash"]

// —————————————————————————————————————————————————————————————————————————————
// Wrapper

function SettingsPortal() {
  const [isOpen, setOpen] = useRecoilState(setting_is_active)

  return isOpen && createPortal(
    <Settings />,
    document.getElementById("portal")!
  )
}

// —————————————————————————————————————————————————————————————————————————————
// Constituent


// —————————————————————————————————————————————————————————————————————————————
// Settings

function Settings() {
  const [currTheme, setTheme] = useRecoilState(theme)
  const [currHome, setHome] = useRecoilState(home)
  const settings = [
    {
      label: "Theme",
      options: themes,
      value: currTheme,
      onChange: (e:React.ChangeEvent<HTMLSelectElement>) => setTheme(e.target.value as Theme)
    },
    {
      label: "Home",
      options: views,
      value: currHome,
      onChange: (e:React.ChangeEvent<HTMLSelectElement>) => setHome(e.target.value as TodoView)
    },
  ]
  return (
    <form id='Settings'>
      {
        settings.map(({ label, options, value, onChange }) => <label>
            <span className="label">{label}</span>
            <select name={label} onChange={onChange} value={value}>
              { options.map(o => <option value={o} key={o}>{o}</option>) }
            </select>
          </label>
        )
      }
    </form>
  )
}

// —————————————————————————————————————————————————————————————————————————————
// Export

export default SettingsPortal