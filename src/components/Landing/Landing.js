import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

export default function Landing() {
  return (
    <div className="landing">
      <div className="landing-container">
        <h1>iComplain</h1>
        <h2>
          <Link to="/signup">Sign up</Link>
        </h2>
        ~ or ~
        <h2>
          <Link to="/login">Log in</Link>
        </h2>
      </div>
    </div>
  );
}
