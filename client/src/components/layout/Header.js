import React from 'react'
import './header.css'
import {Link} from "react-router-dom";

const Header = () => {
  return (
      <div className="header-content">
        <Link to={'/'} className="link">Mikroblog</Link>
        <Link to={'/hot'} className="link">Gorące</Link>
        <Link to={'/'} className="link link-right">Profile</Link>
      </div>
  )
}

export default Header