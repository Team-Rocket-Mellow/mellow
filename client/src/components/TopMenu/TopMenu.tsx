import "./TopMenu.css"
import { useState } from "react"
import { useSetRecoilState, useRecoilValue } from "recoil"
import { modal_is_active, todos_view, home, sideBar } from "../../state/atoms"
import Icon from "../assets/Icon"

// —————————————————————————————————————————————————————————————————————————————
// Component

function TopMenu() {
  const [text, setText] = useState('')
  const setOpen = useSetRecoilState(modal_is_active)
  const setView = useSetRecoilState(todos_view)
  const defaultHome = useRecoilValue(home)
  
  const openModal = () => setOpen(true)
  const goInbox = () => setView(defaultHome)


  const setSideBar = useSetRecoilState(sideBar)
  const watchSideBarValue = useRecoilValue(sideBar)
  const setBar = () => setSideBar(!watchSideBarValue)

  return (
    <header id='NavBar'>
      <nav>
        <Icon onClick={setBar}>menu</Icon>
        <Icon onClick={goInbox}>home</Icon>
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