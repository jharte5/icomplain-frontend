import React from 'react';
import GetAllBlogs from './GetAllBlogs';
// import comingSoon from "../public/coming-soon.jpg"
import './Blogs.css';

export default function Blogs() {
  return (
    <div className="blogs">
      <GetAllBlogs />
      <div className="coming-soon">
        <img src="coming-soon.jpg" />
      </div>
    </div>
  );
}
