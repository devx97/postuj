import React, {Component} from 'react'
import {connect} from "react-redux"
import {Field, reduxForm} from "redux-form"
import {required, length, email} from "redux-form-validators"
import {logIn} from "../../actions";

class LoginForm extends Component {
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
        <form onSubmit={this.props.handleSubmit(this.props.logIn)}>
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
              autoComplete="new-password"
              component={this.renderField}
              validate={[
                required({msg: 'Required.'}),
                length({min: 6, msg: 'Minimum 6 characters.'}),
                length({max: 64, msg: 'Maximum 64 characters.'})
              ]}
          />
          <div className="auth-item btn">
            <button type="submit">Login</button>
          </div>
        </form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  logIn: form => dispatch(logIn(form))
})

LoginForm = connect(
    null,
    mapDispatchToProps
)(LoginForm)

export default reduxForm({
  form: 'login'
})(LoginForm)