import React, {Component} from 'react';
import {connect} from "react-redux";
import {Field, reduxForm} from "redux-form";
import {required, length, email, addValidator} from "redux-form-validators";
import {register} from '../../actions'
import usernameValidator from '../../helpers/usernameValidator'

class RegisterForm extends Component {
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
        <div>
          <form onSubmit={this.props.handleSubmit(this.props.register)}>
            <Field
                name="username"
                label="Username"
                type="text"
                autoComplete="username"
                component={this.renderField}
                validate={[
                  required({msg: 'Required.'}),
                  length({min: 4, msg: 'Minimum 4 characters.'}),
                  length({max: 32, msg: 'Maximum 32 characters.'}),
                  usernameValidator({msg: "Invalid username."}),
                ]}
            />
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
            <Field
                name="password2"
                label="Confirm Password"
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
              <button type="submit">Register</button>
            </div>
          </form>
        </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  register: form => dispatch(register(form))
})

RegisterForm = connect(
    null,
    mapDispatchToProps
)(RegisterForm)

export default reduxForm({
  form: 'register'
})(RegisterForm)