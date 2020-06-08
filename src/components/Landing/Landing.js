import React, { Component } from 'react';
import BlogSlider from '../BlogSlider/BlogSlider';
import Login from '../Login/Login';
// import Signup from './Auth/Signup/Signup';
import './Landing.css';

export default class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <BlogSlider />
        <Login />
      </div>
    );
  }
}
