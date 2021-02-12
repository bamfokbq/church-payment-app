import React from 'react';
import './Header.css';
import logo from '../assets/logo.png';

import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <header className='header'>
      <img className='header__logo' src={logo} alt='Methodist Logo' />
      <ul>
        <li>
          <Link to='/record'>Record</Link>
        </li>
        <li>
          <Link to='/payment'>Add Payment</Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
