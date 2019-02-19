import React, {Component} from 'react';
import './Auth.css'
import {logIn} from "../../actions";
import {connect} from "react-redux";
import backend from '../../apis/backend'

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
      const result = await backend.post('/auth/login', {
        email: this.state.email,
        password: this.state.password,
      })
      this.props.logIn(result.data.token, result.data.user)
      const {history} = this.props
      if (history.length === 1) {
        history.push('/')
      } else {
        this.props.history.goBack()
      }
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
        <div className="auth-form">
          <form onSubmit={this.handleLogin}>
            <div className="auth-item">
              <label>Email</label>
              <input type="email" name="email" placeholder="Enter email"
                     className={this.state.errors.email.length ? 'error' : ''}
                     onChange={this.handleChange}
                     value={this.state.email}
                     required/>
              <div>{this.state.errors.email}</div>
            </div>
            <div className="auth-item">
              <label>Password</label>
              <input type="password" name="password"
                     className={this.state.errors.password.length ? 'error'
                         : ''}
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