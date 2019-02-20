import React, {Component} from 'react'

import RegisterForm from "../../components/auth/RegisterForm"
import './Auth.css'

class Register extends Component {
  render() {
    return (
        <div className="auth-form">
          <RegisterForm/>
        </div>
    )
  }
}

export default Register