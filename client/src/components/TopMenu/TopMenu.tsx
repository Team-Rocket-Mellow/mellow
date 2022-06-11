import "./TopMenu.css"
import { useEffect, useState } from "react"
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil"
import { add_is_active, todos_view, home, sideBar } from "../../state/atoms"
import { Link } from "react-router-dom"
import Icon from "../assets/Icon"

// —————————————————————————————————————————————————————————————————————————————
// Component

function TopMenu() {
  const [text, setText] = useState('')
  const setOpen = useSetRecoilState(add_is_active)
  const setView = useSetRecoilState(todos_view)
  const defaultHome = useRecoilValue(home)
  const [sideBarState, setSideBar] = useRecoilState(sideBar)
  
  const goInbox = () => setView(defaultHome)
  const Δtext = (Δ) => setText(Δ.target.value)
  const openModal = () => setOpen(true)
  const toggleBar = () => setSideBar(!sideBarState)

  const Δkey = (Δ:KeyboardEvent) => {
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
      case "m":
        if (!(document.activeElement instanceof HTMLInputElement)) toggleBar()
        break
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", Δkey)
    return () => document.removeEventListener("keydown", Δkey)
  }, [sideBarState])

  return (
    <header id='NavBar'>
      <nav>
        <Icon onClick={toggleBar}>menu</Icon>
        <Link to={defaultHome} onClick={goInbox} tabIndex={-1}>
          <Icon>home</Icon>
        </Link>
      </nav>
      <input placeholder='/  to search' tabIndex={-1} value={text} onChange={Δtext} onBlur={() => setText("")} />
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