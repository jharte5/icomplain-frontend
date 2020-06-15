import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Consumer } from './components/Context/Context';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Blogs from './components/Blogs/Blogs';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import AddBlog from './components/Blogs/AddBlog';
import Landing from './components/Landing/Landing';
import Profile from './components/Profile/Profile';
import Resources from './components/Resources/Resources';

export default class MainRouter extends Component {
  render() {
    return (
      <Consumer>
        {({ dispatch }) => {
          return (
            <>
              <Navbar dispatch={dispatch} />
              <Switch>
                <Route exact path="/resources" component={Resources} />
                <Route exact path="/addblog" component={AddBlog} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/blogs" component={Blogs} />
                <Route exact path="/" component={Landing} />
                <Route render={() => <h1>Not found</h1>} />
              </Switch>
              <Footer />
            </>
          );
        }}
      </Consumer>
    );
  }
}
