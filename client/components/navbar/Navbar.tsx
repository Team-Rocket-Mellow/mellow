import { useState } from 'react';

function Navbar() {
    const [ text, setText ] = useState('');

   return (
      <header className='navbar'>
          <div className='navbar__title navbar__item'>Mellow</div>
          <input className='navbar_search' 
            placeholder="Search..."
            value={text}
            onChange={e => setText(e.target.value)}
          />
          <div className='navbar__item'>Sign Up</div>
      </header>
  );
}

export default Navbar