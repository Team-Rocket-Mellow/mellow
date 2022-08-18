import "./TopMenu.css"
import { useState, useEffect, useRef, ChangeEventHandler } from "react"
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

  // PROFILE DROPDOWN
  const watchProfile = useRecoilValue(profile_is_active);
  const toggleProfile = useSetRecoilState(profile_is_active);
  const openProfile = () => toggleProfile(!watchProfile);

  console.log('toggle', watchProfile);
  
  // const [profileClicked, setProfileClicked] = useState(false);
  // const openProfile = () => setProfileClicked($ => !$);
  
  // const profileRef = useRef<HTMLDivElement>();
  const profileRef = useRef();
    
  useEffect (() => {
    const handler = (event) => {
      if (!profileRef.current?.contains(event.target)) {
        toggleProfile(false);
      }
    };
    document.addEventListener("mousedown", handler);
      
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  // DARK MODE
  const setDark = () => {
    localStorage.setItem("theme", "dark");
    document.documentElement.setAttribute("data-theme", "dark");
  };

  const setLight = () => {
    localStorage.setItem("theme", "light");
    document.documentElement.setAttribute("data-theme", "light");
  };

  const storedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

  const defaultDark = storedTheme === "dark" || (storedTheme === null && prefersDark);

  if (defaultDark) {
    setDark();
  };

  const toggleTheme: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.checked) {
      setDark();
    } else {
      setLight();
    }
  };

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
      <nav className="right-items">
      <input
          type="checkbox"
          id="checkbox"
          onChange={toggleTheme}
          defaultChecked={defaultDark}
          />
        <Tooltip content="add todo" hotkey="q">
          <Icon onClick={openModal}>add</Icon>
        </Tooltip>
        <Icon onClick={openSettings}>settings</Icon>
        <Icon onClick={openProfile}>account_circle</Icon>
        {watchProfile ? <div ref={profileRef}><Profile /></div> : null}
      </nav>
    </header>
  )
}

// —————————————————————————————————————————————————————————————————————————————
// Export

export default TopMenu