import "./Navbar.css"
import { useState } from 'react';

function Navbar() {
    const [ text, setText ] = useState('');

   return (
      <header id='navbar'>
        <div className='navbar__title navbar__item'>mellow</div>
        <input className='navbar_search' 
          placeholder="Search..."
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <div className="outer-container-navbar">
          <div className='navbar-sign-up'><h4>sign up</h4></div>
        </div>
      </header>
  );
}

export default Navbar