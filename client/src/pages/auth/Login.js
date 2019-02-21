import React, {Component} from 'react'
import {connect} from "react-redux"
import {Field, reduxForm} from "redux-form"
import {Link} from 'react-router-dom'
import {required, length, email} from "redux-form-validators"

import {logIn} from "../../actions"
import './Auth.css'

class Login extends Component {
  renderField = ({input, label, type, meta: {touched, error}}) =>
      <div className="auth-item">
        <label>{label}</label>
        <input {...input}
               className={`${touched && error && 'error'}`}
               placeholder={`Enter ${label.split(" ").pop().toLowerCase()}`}
               type={type}
               autoComplete="username"
        />
        {touched && error && <div>{error}</div>}
      </div>

  render() {
    return (
        <form
            className="auth-form"
            onSubmit={this.props.handleSubmit(this.props.logIn)}>
          <Field
              name="email"
              label="Email"
              type="email"
              autoComplete="email"
              component={this.renderField}
              validate={[
                required({msg: 'Required.'}),
                length({min: 6, msg: 'Minimum 6 characters.'}),
                length({max: 64, msg: 'Maximum 64 characters.'}),
                email({msg: 'Email adress is not valid.'}),
              ]}
          />
          <Field
              name="password"
              label="Password"
              type="password"
              autoComplete="password"
              component={this.renderField}
              validate={[
                required({msg: 'Required.'}),
                length({min: 6, msg: 'Minimum 6 characters.'}),
                length({max: 64, msg: 'Maximum 64 characters.'})
              ]}
          />
          <div className="auth-item auth-left">
            <button type="submit">Login</button>
          </div>
          <div className="auth-item">
            <Link to={'/forgot-password'} className={'auth-right'}>
              Forgot password?
            </Link>
          </div>

        </form>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  logIn: form => dispatch(logIn(form))
})

Login = connect(
    null,
    mapDispatchToProps
)(Login)

export default reduxForm({
  form: 'login'
})(Login)