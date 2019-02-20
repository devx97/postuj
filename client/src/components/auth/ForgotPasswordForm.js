import React, {Component} from 'react'
import {connect} from "react-redux"
import {Field, reduxForm} from "redux-form"
import {required, length, email} from "redux-form-validators"
import {forgotPassword} from "../../actions"

class ForgotPasswordForm extends Component {
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
        <form onSubmit={this.props.handleSubmit(this.props.forgotPassword)}>
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
          <div className="auth-item btn">
            <button type="submit">Send</button>
          </div>
        </form>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  forgotPassword: form => dispatch(forgotPassword(form))
})

ForgotPasswordForm = connect(
    null,
    mapDispatchToProps
)(ForgotPasswordForm)

export default reduxForm({
  form: 'forgotPassword'
})(ForgotPasswordForm)