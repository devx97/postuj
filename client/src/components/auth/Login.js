import React, {Component} from 'react';
import axios from 'axios'
import './Auth.css'
import {logIn} from "../../actions";
import {connect} from "react-redux";

class Login extends Component {

  state = {
    email: '',
    password: '',
    errors: {
      email: '',
      password: ''
    }
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleLogin = async event => {
    event.preventDefault()
    try {
      const result = await axios.post('http://localhost:5000/api/auth/login', {
        email: this.state.email,
        password: this.state.password,
      })
      this.props.logIn(result.data.token, result.data.user)
      this.props.history.push('/')
    } catch (err) {
      this.setState(prev => {
        prev.errors = {
          email: '',
          password: ''
        }
        err.response.data.data.map(error => prev.errors[error.param] = error.msg)
        return prev // but updated
      })
    }
  }

  render() {
    return (
        <div className="auth-form">
          <form onSubmit={this.handleLogin}>
            <div className="auth-item">
              <label>Email</label>
              <input type="email" name="email" placeholder="Enter email"
                     onChange={this.handleChange}
                     value={this.state.email}
                     required/>
              <div>{this.state.errors.email}</div>
            </div>
            <div className="auth-item">
              <label>Password</label>
              <input type="password" name="password"
                     onChange={this.handleChange}
                     value={this.state.password}
                     placeholder="Enter password" required/>
              <div>{this.state.errors.password}</div>
            </div>
            <div className="auth-item btn">
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  logIn: (token, user) => dispatch(logIn(token, user))
})

export default connect(
    null,
    mapDispatchToProps,
)(Login)