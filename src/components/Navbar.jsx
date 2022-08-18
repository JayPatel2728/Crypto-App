import React from "react";
import { Link } from 'react-router-dom'
import '../styles/Navbar.css'

function Navbar() {
  return (
    <Link to='/'>
      <div className="navbar">
        <div className="navbar-container">
            <img src="cryptotracker.PNG" alt="LOGO" />
        </div>
      </div>
    </Link>
  );
}

export default Navbar;
