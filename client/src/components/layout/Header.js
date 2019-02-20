import React, {Component} from 'react'
import {Link} from "react-router-dom"
import {connect} from "react-redux"

import {logOut} from "../../actions"

import './Header.css'

class Header extends Component {
  render() {
    return (
        <div className="header-content">
          <Link to={'/'} className="link">Mikroblog</Link>
          <Link to={'/hot'} className="link">Gorące</Link>
          {this.props.isLogged ?
              <div className="link-right">
                <button className="logout" onClick={this.props.logOut}>
                  Logout
                </button>
                <Link to={'/profile'} className="link ">Profile</Link>
              </div>
              : <div className="link-right">
                <Link to={'/register'} className="link ">Register</Link>
                <Link to={'/login'} className="link link-right">Login</Link>
              </div>
          }
        </div>
    )
  }
}

const mapStateToProps = state => ({
  isLogged: state.auth.isLogged
})

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(logOut())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Header)