import React, { Component } from 'react';
import AuthLinks from './AuthLinks';
import UnAuthLinks from './UnAuthLinks';
import { isAuthenticated, setUserAuth } from '../Services/AuthHelpers';
import { Consumer } from '../Context/Context';
import './Navbar.css';

export default class Navbar extends Component {
  componentDidMount() {
    let jwtToken = isAuthenticated();

    if (jwtToken) {
      setUserAuth(jwtToken, this.props.dispatch);
    }
  }

  render() {
    return (
      <Consumer>
        {stateOfContext => {
          const {
            isAuth: { user, auth },
          } = stateOfContext;

          return (
            <nav>
              {user && auth ? (
                <AuthLinks {...user} {...auth} />
              ) : (
                <UnAuthLinks />
              )}
            </nav>
          );
        }}
      </Consumer>
    );
  }
}
