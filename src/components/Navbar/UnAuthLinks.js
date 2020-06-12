import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

export default function UnAuthLinks() {
  return (
    <div className="nav">
      <NavLink
        to="/"
        className="nav-home"
        activeStyle={{ fontWeight: 'bold' }}
        activeClassName="selected"
        exact
      >
        iComplain
      </NavLink>
      <ul className="nav-ul">
        <li>
          <NavLink
            to="/signup"
            className="nav-link"
            activeStyle={{ fontWeight: 'bold' }}
            activeClassName="selected"
          >
            Sign up
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/login"
            className="nav-link"
            activeStyle={{ fontWeight: 'bold' }}
            activeClassName="selected"
          >
            Log in
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
