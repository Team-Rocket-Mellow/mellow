import "./TopMenu.css"
import { useState } from "react"
import { useSetRecoilState } from "recoil"
import { modal_is_active } from "../../state/atoms"

// —————————————————————————————————————————————————————————————————————————————
// Component

function TopMenu() {
  const [text, setText] = useState('')
  const setOpen = useSetRecoilState(modal_is_active)

  const openModal = () => setOpen(true)

  return (
    <header id='NavBar'>
      <i className='material-symbols-rounded'>menu</i>
      <i className='material-symbols-rounded'>home</i>
      <input
        type='search'
        tabIndex={-1}
        placeholder='/  to search'
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <i className='material-symbols-rounded' onClick={openModal}>add</i>
      <i className='material-symbols-rounded'>settings</i>
      <i className='material-symbols-rounded'>account_circle</i>
    </header>
  )
}

// —————————————————————————————————————————————————————————————————————————————
// Export

export default TopMenu