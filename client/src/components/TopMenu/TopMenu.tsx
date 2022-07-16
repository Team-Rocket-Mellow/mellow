import "./TopMenu.css"
import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"

import { useSetRecoilState, useRecoilValue } from "recoil"
import { add_is_active, todos_view, home, left_menu, setting_is_active, profile_is_active } from "../../state/atoms"

import Icon from "../assets/Icon"
import SearchInput from "../Search/SearchInput"
import Tooltip from "../assets/Tooltip"
import Profile from "../Profile/Profile"
import React from "react"

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

  // const watchProfile = useRecoilValue(profile_is_active);
  // const toggleProfile = useSetRecoilState(profile_is_active);
  // const openProfile = () => toggleProfile(!watchProfile);

  const [profileClicked, setProfileClicked] = useState(false);
  const openProfile = () => setProfileClicked($ => !$);

  const profileRef = useRef<HTMLDivElement>();

  useEffect (() => {
    const handler = (event) => {
      if (!profileRef.current?.contains(event.target)) {
        setProfileClicked(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  console.log('this is profile', profileClicked);

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
        <Icon onClick={openSettings}>settings</Icon>
        <Icon onClick={openProfile}>account_circle</Icon>
        <div ref={profileRef}>{profileClicked ? <Profile /> : null}</div>
      </nav>
    </header>
  )
}

// —————————————————————————————————————————————————————————————————————————————
// Export

export default TopMenu