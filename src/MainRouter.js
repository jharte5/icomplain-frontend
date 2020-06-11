import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Consumer } from './components/Context/Context';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Blogs from './components/Blogs/Blogs';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import AddBlog from './components/AddBlog/AddBlog'

export default class MainRouter extends Component {
  render() {
    return (
      <Consumer>
        {({ dispatch }) => {
          return (
            <>
              <Navbar dispatch={dispatch} />
              <Switch>
                <Route exact path="/addblog" component={AddBlog} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/blogs" component={Blogs} />
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
