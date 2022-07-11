import "./Settings.css"
import { useEffect, } from "react"
import { createPortal } from "react-dom"
import { TodoView, Theme, } from "../../state/types"
import { 
  setting_is_active, 
  theme as $theme, 
  home as $home 
} from "../../state/atoms"
import { useRecoilState } from "recoil"

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
  const [theme, setTheme] = useRecoilState($theme)
  const [home, setHome] = useRecoilState($home)
  const settings = [
    {
      label: "Theme",
      options: themes,
      value: theme,
      onChange: (e:React.ChangeEvent<HTMLSelectElement>) => setTheme(e.target.value as Theme)
    },
    {
      label: "Home",
      about: "The default view.",
      options: views,
      value: home,
      onChange: (e:React.ChangeEvent<HTMLSelectElement>) => setHome(e.target.value as TodoView)
    },
  ]
  return (
    <form id="Settings">
      {
        settings.map(({ label, about, options, value, onChange }) => (
          <label className="SelectMenu">
            <span className="label">{label}</span>
            <select name={label} onChange={onChange} value={value}>
              { options.map(o => <option value={o} key={o}>{o}</option>) }
            </select>
          </label>
        ))
      }
    </form>
  )
}

// —————————————————————————————————————————————————————————————————————————————
// Export

export default SettingsPortal