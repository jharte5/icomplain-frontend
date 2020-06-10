import React, { Component } from 'react';
import BlogSlider from '../BlogSlider/BlogSlider';
// import Signup from '../Signup/Signup';
import Login from '../Login/Login';
import './Landing.css';

export default class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <BlogSlider />
        {/* <Signup /> */}
        <Login />
      </div>
    );
  }
}
