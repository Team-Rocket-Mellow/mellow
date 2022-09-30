import "./TopMenu.css"
import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"

import { useSetRecoilState, useRecoilValue } from "recoil"
import { 
  add_is_active, 
  todos_view, 
  home, 
  left_menu, 
  setting_is_active, 
  profile_is_active 
} from "../../state/atoms"

import Icon from "../assets/Icon"
import SearchInput from "../Search/SearchInput"
import Tooltip from "../assets/Tooltip"
import Profile from "../Profile/Profile"

// —————————————————————————————————————————————————————————————————————————————
// Component

function TopMenu() {
  const toggleMenu = useSetRecoilState(left_menu)
  const toggleSettings = useSetRecoilState(setting_is_active)
  const toggleAddModal = useSetRecoilState(add_is_active)
  const setView = useSetRecoilState(todos_view)
  const defaultHome = useRecoilValue(home)
  const Δmenu = () => toggleMenu($ => !$)
  const goHome = () => setView(defaultHome)
  const openModal = () => toggleAddModal(true)
  const openSettings = () => toggleSettings($ => !$)

  const watchProfile = useRecoilValue(profile_is_active);
  const toggleProfile = useSetRecoilState(profile_is_active);
  const $profile = useRef<HTMLDivElement>()
  const openProfile = () => toggleProfile(!watchProfile);

  useEffect (() => {
    const handler = (event) => !$profile.current?.contains(event.target) && toggleProfile(false)
    document.addEventListener("mousedown", handler)

    return () => document.removeEventListener("mousedown", handler)
  })

  const setTheme = (light=true) => {
    const theme = light ? "light" : "dark"
    localStorage.setItem("theme", theme)
    document.documentElement.setAttribute("data-theme", theme)
  }

  const storedTheme = localStorage.getItem("theme")
  const prefersDark = window.matchMedia 
    && window.matchMedia("(prefers-color-scheme: dark)").matches

  const defaultDark = storedTheme === "dark" || (storedTheme === null && prefersDark)

  if (defaultDark) { setTheme(false) }

  const toggleTheme = (e) => setTheme(e.target.checked)

  return (
    <header id='NavBar'>
      <nav>
        <Tooltip content="menu" hotkey="m">
          <Icon onClick={Δmenu}>menu</Icon>
        </Tooltip>
        <Tooltip content="home" hotkey="h">
          <Link to={defaultHome} onClick={goHome} tabIndex={-1}>
            <Icon className="home-icon">home</Icon>
          </Link>
        </Tooltip>
      </nav>
      <SearchInput />
      <nav className="right_nav_items">
        <input type="checkbox" onChange={toggleTheme} defaultChecked={defaultDark} />
        <Tooltip content="add todo" hotkey="q">
          <Icon onClick={openModal}>add</Icon>
        </Tooltip>
        <Icon onClick={openSettings}>settings</Icon>
        <div ref={$profile}>
          <Icon onClick={openProfile}>account_circle</Icon>
          { watchProfile && <Profile /> }
        </div>
      </nav>
    </header>
  )
}

// —————————————————————————————————————————————————————————————————————————————
// Export

export default TopMenu