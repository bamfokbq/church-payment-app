import React from 'react';
import './Header.css';

import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <header className='header'>
      <h1>PAYMENTS</h1>
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
