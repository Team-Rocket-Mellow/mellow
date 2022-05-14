import { useState } from 'react';

function Navbar() {
    const [ text, setText ] = useState('');

   return (
      <header className='navbar'>
          <div className='navbar__title navbar__item'>MELLOW</div>
          <input className='navbar_search' 
            placeholder="Search..."
            value={text}
            onChange={e => setText(e.target.value)}
          />
          <div className="outer-container-navbar">
            <div className='navbar-sign-up'><h4>Sign Up</h4></div>
          </div>
      </header>
  );
}

export default Navbar