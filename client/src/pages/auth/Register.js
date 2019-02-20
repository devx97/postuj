import React, {Component} from 'react';

import './Auth.css'
import RegisterForm from "../../components/auth/RegisterForm";

let backend;
class Register extends Component {

  handleRegister = async event => {
    event.preventDefault()
    try {
      await backend.put('/auth/register', {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        password2: this.state.password2
      })
      this.props.history.push('/login')
    } catch (err) {
      this.setState(prev => {
        prev.errors = {
          username: '',
          email: '',
          password: '',
          password2: '',
        }
        err.response.data.data.map(
            error => prev.errors[error.param] = error.msg)
        return prev // but updated
      })
    }
  }

  render() {
    return (
        <div className="auth-form">
          <RegisterForm/>
        </div>
    );
  }
}

export default Register