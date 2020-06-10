import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Landing from './components/Landing/Landing';
import Home from './components/Home';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';

export default class MainRouter extends Component {
  render() {
    return (
      <>
        
        <Switch>
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/blogs" component={Home} />
          <Route exact path="/" component={Landing} />
          <Route render={() => <h1>Not found</h1>} />
        </Switch>
      </>
    );
  }
}
