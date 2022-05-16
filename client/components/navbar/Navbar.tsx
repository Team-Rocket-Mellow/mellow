import "./Navbar.css"
import { useState } from 'react';

function Navbar() {
  const [ text, setText ] = useState('');

  return (
    <header id='Navbar'>
      <i className="material-symbols-rounded">menu</i>
      <i className="material-symbols-rounded">home</i>
      <input className='navbar_search'
        placeholder="search..."
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <i className="material-symbols-rounded">settings</i>
    </header>
  )
}

export default Navbar