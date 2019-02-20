import React, {Component} from 'react'

import ForgotPasswordForm from '../../components/auth/ForgotPasswordForm'
import './Auth.css'

class Login extends Component {
  render() {
    return (
        <div className="auth-form">
          <ForgotPasswordForm/>
        </div>
    )
  }
}

export default Login
