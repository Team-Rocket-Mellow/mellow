import "./TopMenu.css"
import { useState } from 'react';

// —————————————————————————————————————————————————————————————————————————————
// Component

function TopMenu() {
  const [ text, setText ] = useState('');

  return (
    <header id='NavBar'>
      <i className="material-symbols-rounded">menu</i>
      <i className="material-symbols-rounded">home</i>
      <input
        className='navbar_search'
        placeholder="search..."
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <i className="material-symbols-rounded">settings</i>
      <i className="material-symbols-rounded">account_circle</i>
    </header>
  )
}

// —————————————————————————————————————————————————————————————————————————————
// Export

export default TopMenu