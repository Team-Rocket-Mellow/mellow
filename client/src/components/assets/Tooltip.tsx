import "./Tooltip.css"
import { useState } from "react"

function Tooltip({ children, content, hotkey, ...props }) {
  const [isOpen, setOpen] = useState(false)
  let timeout:ReturnType<typeof setTimeout>

  const enter = () => timeout = setTimeout(setOpen, 500, true)
  const leave = () => { setOpen(false), clearTimeout(timeout) }

  return (
    <div id="Tooltip" onMouseEnter={enter} onMouseLeave={leave} {...props}>
      {children}
      { 
        isOpen && (
          <div className="bottom">
            {content} <code className="hokey">{hotkey}</code>
          </div>
        ) 
      }
    </div>
  )
}

export default Tooltip