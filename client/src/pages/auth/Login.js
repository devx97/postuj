import React, {Component} from 'react';
import LoginForm from "../../components/auth/LoginForm";
import './Auth.css'

class Login extends Component {
  render() {
    return (
        <div className="auth-form">
          <LoginForm/>
        </div>
    );
  }
}

export default Login
