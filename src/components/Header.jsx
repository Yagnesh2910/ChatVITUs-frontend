import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import historyIcon from '../assets/history.png'

function Header() {
  return (
    <div className='head'>
        <div className='logo'>
          <Link to="/home" id='links'>
            <h1>Chat <span>VIT</span> Us</h1>
          </Link>
        </div>
        <div className='history'>
          <Link to="/history" id='links'>
            <img src={historyIcon} alt="" />
          </Link>
        </div>
    </div>
  )
}

export default Header;
