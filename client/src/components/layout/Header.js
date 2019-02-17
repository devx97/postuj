import React, {Component} from 'react'
import './header.css'
import {Link, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {logIn, logOut} from "../../actions";
import axios from 'axios'

class Header extends Component {
  async componentDidMount() {
    try {
      const result = await axios.get('http://localhost:5000/api/auth/refresh', {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      this.props.logIn(result.data.token)
    } catch (err) {
      console.log(err)
    }
  }

  // handleLogOut = event => {
  //
  // }
  render() {
    return (
        <div className="header-content">
          <Link to={'/'} className="link">Mikroblog</Link>
          <Link to={'/hot'} className="link">Gorące</Link>
          {this.props.isLogged ?
              <div className="link-right">
                <button className="logout"
                        onClick={event => this.props.logOut()}>Logout
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
  logOut: () => dispatch(logOut()),
  logIn: token => dispatch(logIn(token))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Header)