import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Consumer } from './components/Context/Context';
import Navbar from './components/Navbar/Navbar';

const Home = React.lazy(() => import('./components/Home/Home'));
const Login = React.lazy(() => import('./components/Login/Login'));
const Signup = React.lazy(() => import('./components/Signup/Signup'));

export default class MainRouter extends Component {
  render() {
    return (
      <Consumer>
        {({ dispatch }) => {
          return (
            <>
              <Navbar dispatch={dispatch} />

              <Switch>
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/" component={Home} />

                <Route render={() => <h1>Not found</h1>} />
              </Switch>
            </>
          );
        }}
      </Consumer>
    );
  }
}
