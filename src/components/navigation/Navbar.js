import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = (props) => {
  // const isLoggedIn = localStorage.getItem('toke');
return (
  <nav className="navbar">
    <div className="navbar-left">
      <Link to="/" className="navbar-brand">
        AddVentures
      </Link>
    </div>
    <div className="navbar-right">
      <Link to="/" className="navbar-link">
        Home
      </Link>
      <Link to="/places" className="navbar-link">
        Places
      </Link>
      <Link to="/memories" className="navbar-link">
        Memories
      </Link>
      {props.userProp ?  (
        <>
        <span className='navbar-user'>
        {props.userProp}
        </span>
      <Link onClick={props.logout} className="navbar-button">
         Logout
      </Link>
        </>
      ) : (
      <Link to="/login" className="navbar-button">
        Login/Register
      </Link>
       )}
    </div>
  </nav>
);
};

export default Navbar;


