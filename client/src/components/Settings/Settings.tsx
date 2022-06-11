import { TodoView, Theme, } from "../../state/types"

// —————————————————————————————————————————————————————————————————————————————
// Environment

type Settings = {
  theme: Theme
  home: TodoView
}

const themes:Theme[] = ["light", "dark", "contrast"]
const views:TodoView[] = ["all", "inbox", "today", "upcoming", "done", "trash"]

// —————————————————————————————————————————————————————————————————————————————
// Constituent

function Select({ label, options }: { label:string, options:string[] }) {
  return (
    <label htmlFor={label}>
      {label}
      <select name={label}>
        { options.map(o => <option value={o} key={o}>{o}</option>) }
      </select>
    </label>
  )
}

// —————————————————————————————————————————————————————————————————————————————
// Settings

function Settings() {
  return (
    <form id='Settings'>
      <Select label='Theme' options={themes} />
      <Select label='Home' options={views} />
    </form>
  )
}

// —————————————————————————————————————————————————————————————————————————————
// Export

export default Settings