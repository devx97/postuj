import React, {Component} from 'react'
import {connect} from "react-redux"
import {Link} from 'react-router-dom'
import {required, length, email} from "redux-form-validators"
import {Form, Field} from 'react-final-form'
import {Button, Form as SUIForm, Menu} from 'semantic-ui-react'

import FormField from '../../components/auth/FormField'
import {logIn} from "../../actions"
import {composeValidators} from '../../helpers/customValidators'

class Login extends Component {
  render() {
    return (
        <Form
            onSubmit={this.props.logIn}
            render={({handleSubmit, errors}) => (
                <SUIForm
                    inverted
                    error={errors && true}
                    onSubmit={handleSubmit}>
                  <Field
                      name="email"
                      label="Email"
                      type="email"
                      autoComplete="email"
                      component={FormField}
                      validate={composeValidators(
                          required({msg: 'Required.'}),
                          length({min: 6, msg: 'Minimum 6 characters.'}),
                          length({max: 64, msg: 'Maximum 64 characters.'}),
                          email({msg: 'Email adress is not valid.'}),
                      )}
                  />
                  <Field
                      name="password"
                      label="Password"
                      type="password"
                      autoComplete="password"
                      component={FormField}
                      validate={composeValidators(
                          required({msg: 'Required.'}),
                          length({min: 6, msg: 'Minimum 6 characters.'}),
                          length({max: 64, msg: 'Maximum 64 characters.'})
                      )}
                  />
                  <Menu secondary inverted style={{paddingLeft: '5px'}}>
                    <Button color="blue" type="submit" content={'Login'}/>
                    <Menu.Item position={'right'} as={Link} to={'/forgot-password'}
                               content={'Forgot password?'}/>
                  </Menu>
                </SUIForm>)
            }
        />
    )
  }
}

const mapDispatchToProps = dispatch => ({
  logIn: form => dispatch(logIn(form))
})

export default Login = connect(
    null,
    mapDispatchToProps
)(Login)
