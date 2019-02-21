import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from "react-redux"
import {Field, reduxForm} from "redux-form"
import {required, length} from "redux-form-validators"

import {resetPassword} from "../../actions"
import {passwordsMatch, tokenValidator} from '../../helpers/customValidators'
import './Auth.css'

class ResetPassword extends Component {
  componentWillMount() {
    if (this.props.isLogged)
      this.props.history.goBack()
  }

  renderField = ({input, label, type, meta: {touched, error}}) =>
      <div className="auth-item">
        <label>{label}</label>
        <input {...input}
               className={`${touched && error && 'error'}`}
               placeholder={`Enter ${label && label.split(
                   " ").pop().toLowerCase()}`}
               type={type}
               autoComplete="username"
        />
        {touched && error && <div>{error}</div>}
      </div>

  render() {
    let resetTokenError
    if (this.props.resetPasswordForm
        && this.props.resetPasswordForm.syncErrors
        && this.props.resetPasswordForm.syncErrors.resetToken) {
      resetTokenError = this.props.resetPasswordForm.syncErrors.resetToken
    }
    return (
        <form className="auth-form"
              onSubmit={this.props.handleSubmit(this.props.resetPassword)}>
          <Field
              name="password"
              label="New password"
              type="password"
              autoComplete="new-password"
              component={this.renderField}
              validate={[
                required({msg: 'Required.'}),
                length({min: 6, msg: 'Minimum 6 characters.'}),
                length({max: 64, msg: 'Maximum 64 characters.'})
              ]}
          />
          <Field
              name="password2"
              label="Confirm new password"
              type="password"
              autoComplete="new-password"
              component={this.renderField}
              validate={[
                required({msg: 'Required.'}),
                length({min: 6, msg: 'Minimum 6 characters.'}),
                length({max: 64, msg: 'Maximum 64 characters.'}),
                passwordsMatch({msg: 'Passwords have to match.'}),
              ]}
          />
          <Field
              name="resetToken"
              type="hidden"
              component="input"
              validate={[
                required({msg: 'Required.'}),
                tokenValidator(
                    {msg: 'Token expired or invalid. Generate new token.'}),
              ]}
          />
          {resetTokenError && <div className="auth-item"
                                   style={{color: 'red'}}>{resetTokenError}</div>}
          <div className="auth-item">
            <button type="submit">Send</button>
          </div>
          <div className="auth-item">
            <Link to={'/forgot-password'} className={'auth-right'}>
              Generate new token
            </Link>
          </div>
        </form>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  initialValues: {resetToken: ownProps.match.params.resetToken},
  resetPasswordForm: state.form.resetPassword,
  isLogged: state.auth.isLogged,
})

const mapDispatchToProps = dispatch => ({
  resetPassword: form => dispatch(resetPassword(form))
})

ResetPassword = reduxForm({
  form: 'resetPassword',
  enableReinitialize: true,
})(ResetPassword)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResetPassword)
