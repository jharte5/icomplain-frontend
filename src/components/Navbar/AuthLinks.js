import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Context } from '../Context/Context';
import { logout } from '../Services/AuthHelpers';
import './Navbar.css';

class AuthLinks extends Component {
  static contextType = Context;

  logout = async () => {
    try {
      await logout();

      this.context.dispatch({
        type: 'SUCCESS_SIGNED_OUT',
      });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <div className="nav">
        <NavLink
          to="/blogs"
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
              to="/addblog"
              className="navbar"
              activeStyle={{ fontWeight: 'bold' }}
              activeClassName="selected"
            >
              Post blog
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              className="navbar"
              activeStyle={{ fontWeight: 'bold' }}
              activeClassName="selected"
            >
              {this.props.username}
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" className="navbar" onClick={this.logout}>
              logout
            </NavLink>
          </li>
        </ul>
      </div>
    );
  }
}

export default AuthLinks;
