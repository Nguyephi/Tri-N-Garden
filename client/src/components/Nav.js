import React from 'react';
import './nav.css'

const Nav = () => (
  <nav id='nav-bar'>
    <header id='nav-header'>
      Tri N Garden
    </header>
    <ul id='nav-link-list'>
      <li><a className='pointer'>Home</a></li>
      <li><a className='pointer'>My Garden</a></li>
      <li><a className='pointer'>Add Plant</a></li>
      <li><a className='pointer'>About Us</a></li>
    </ul>
  </nav>
);

export default Nav;