import "./TopMenu.css"
import { useState } from "react"
import { useSetRecoilState, useRecoilValue } from "recoil"
import { add_is_active, todos_view, home } from "../../state/atoms"
import { Link } from "react-router-dom"
import Icon from "../assets/Icon"

// —————————————————————————————————————————————————————————————————————————————
// Component

function TopMenu() {
  const [text, setText] = useState('')
  const setOpen = useSetRecoilState(add_is_active)
  const setView = useSetRecoilState(todos_view)
  const defaultHome = useRecoilValue(home)

  const openModal = () => setOpen(true)
  const goInbox = () => setView(defaultHome)

  return (
    <header id='NavBar'>
      <nav>
        <Icon>menu</Icon>
        <Link to={defaultHome} onClick={goInbox}>
          <Icon>home</Icon>
        </Link>
      </nav>
      <input
        type='search'
        placeholder='/  to search'
        tabIndex={-1}
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <nav>
        <Icon onClick={openModal}>add</Icon>
        <Icon>settings</Icon>
        <Icon>account_circle</Icon>
      </nav>
    </header>
  )
}

// —————————————————————————————————————————————————————————————————————————————
// Export

export default TopMenu