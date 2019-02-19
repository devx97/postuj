import React, {Component} from 'react'
import './Header.css'
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {logIn, logOut} from "../../actions";
import backend from '../../apis/backend'

class Header extends Component {
  async componentDidMount() {
    if (!localStorage.getItem('token')) {
      return
    }
    try {
      const result = await backend.get('/auth/token')
      this.props.logIn(localStorage.getItem('token'), result.data.user)
    } catch (err) {
      console.log(err)
    }
  }

  handleLogOut = async event => {
    event.preventDefault()
    try {
      const result = await backend.get('/auth/logout', {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      console.log(result)
      this.props.logOut()
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
        <div className="header-content">
          <Link to={'/'} className="link">Mikroblog</Link>
          <Link to={'/hot'} className="link">Gorące</Link>
          {this.props.isLogged ?
              <div className="link-right">
                <button className="logout" onClick={this.handleLogOut}>
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
  logOut: () => dispatch(logOut()),
  logIn: (token, user) => dispatch(logIn(token, user))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Header)