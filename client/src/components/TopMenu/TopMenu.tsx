import "./TopMenu.css"
import { Link } from "react-router-dom"

import { useSetRecoilState, useRecoilValue } from "recoil"
import { add_is_active, todos_view, home, left_menu } from "../../state/atoms"

import Icon from "../assets/Icon"
import SearchInput from "../Search/SearchInput"
import Tooltip from "../assets/Tooltip"

// —————————————————————————————————————————————————————————————————————————————
// Component

function TopMenu() {
  const toggleMenu = useSetRecoilState(left_menu)
  const toggleAddModal = useSetRecoilState(add_is_active)
  const setView = useSetRecoilState(todos_view)
  const defaultHome = useRecoilValue(home)
  const Δmenu = () => toggleMenu($ => !$)
  const goHome = () => setView(defaultHome)
  const openModal = () => toggleAddModal(true)

  return (
    <header id='NavBar'>
      <nav>
        <Tooltip content="menu" hotkey="m">
          <Icon onClick={Δmenu}>menu</Icon>
        </Tooltip>
        <Tooltip content="home" hotkey="h">
          <Link to={defaultHome} onClick={goHome} tabIndex={-1}>
            <Icon>home</Icon>
          </Link>
        </Tooltip>
      </nav>
      <SearchInput />
      <nav>
        <Tooltip content="add todo" hotkey="q">
          <Icon onClick={openModal}>add</Icon>
        </Tooltip>
        <Icon>settings</Icon>
        <Icon>account_circle</Icon>
      </nav>
    </header>
  )
}

// —————————————————————————————————————————————————————————————————————————————
// Export

export default TopMenu