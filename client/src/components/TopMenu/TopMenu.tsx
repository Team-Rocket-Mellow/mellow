import "./TopMenu.css"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil"
import { add_is_active, todos_view, home, left_menu } from "../../state/atoms"
import Icon from "../assets/Icon"

// —————————————————————————————————————————————————————————————————————————————
// Component

function TopMenu() {
  const [text, setText] = useState("")
  const toggleMenu = useSetRecoilState(left_menu)
  const toggleAddModal = useSetRecoilState(add_is_active)
  const setView = useSetRecoilState(todos_view)
  const defaultHome = useRecoilValue(home)

  const Δtext = (Δ) => setText(Δ.target.value)
  const Δmenu = () => toggleMenu($ => !$)
  
  const goHome = () => setView(defaultHome)
  const openModal = () => toggleAddModal(true)
  const clearText = () => setText("")
  const hotkey = (Δ:KeyboardEvent) => {
    const $input = document.querySelector<HTMLInputElement>("#NavBar input")!
    switch (Δ.key) {
      case "/":
        if (!(document.activeElement instanceof HTMLInputElement)) {
          Δ.preventDefault()
          $input?.focus()
        }
        break
      case "Escape":
        Δ.preventDefault()
        if (document.activeElement === $input) $input?.blur()
        break
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", hotkey)
    return () => document.removeEventListener("keydown", hotkey)
  }, [])

  return (
    <header id='NavBar'>
      <nav>
        <Icon onClick={Δmenu}>menu</Icon>
        <Link to={defaultHome} onClick={goHome} tabIndex={-1}>
          <Icon>home</Icon>
        </Link>
      </nav>
      <input
        placeholder='/  to search'
        type='search'
        tabIndex={-1}
        value={text}
        onChange={Δtext}
        onBlur={clearText}
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