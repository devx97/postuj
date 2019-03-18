import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from "react-redux"
import {Field, Form} from "react-final-form"
import {required, length, email} from "redux-form-validators"
import {Button, Form as SUIForm, Menu, Segment} from 'semantic-ui-react'

import FormField from '../../components/auth/FormField'
import {composeValidators, usernameValidator, passwordsMatch} from '../../helpers/customValidators'
import {register} from '../../actions'

class Register extends Component {
  render() {
    return (
        <Segment inverted>
          <Form
              onSubmit={this.props.register}
              render={({handleSubmit, errors}) =>
                  <SUIForm
                      inverted
                      error={errors && true}
                      onSubmit={handleSubmit}>
                    <Field
                        name="username"
                        label="Username"
                        type="text"
                        autoComplete="username"
                        component={FormField}
                        validate={composeValidators(
                            required({msg: 'Required.'}),
                            length({min: 4, msg: 'Minimum 4 characters.'}),
                            length({max: 32, msg: 'Maximum 32 characters.'}),
                            usernameValidator({msg: "Invalid username."}),
                        )}
                    />
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
                        autoComplete="new-password"
                        component={FormField}
                        validate={composeValidators(
                            required({msg: 'Required.'}),
                            length({min: 6, msg: 'Minimum 6 characters.'}),
                            length({max: 64, msg: 'Maximum 64 characters.'})
                        )}
                    />
                    <Field
                        name="password2"
                        label="Confirm Password"
                        type="password"
                        autoComplete="new-password"
                        component={FormField}
                        validate={composeValidators(
                            required({msg: 'Required.'}),
                            length({min: 6, msg: 'Minimum 6 characters.'}),
                            length({max: 64, msg: 'Maximum 64 characters.'}),
                            passwordsMatch(
                                {pass2name: 'password', msg: 'Passwords have to match.'}),
                        )}
                    />
                    <Menu secondary inverted style={{paddingLeft: '5px'}}>
                      <Button color="blue" type="submit" content={'Register'}/>
                      <Menu.Item position={'right'} as={Link} to={'/login'}
                                 content={'Log in instead'}/>
                    </Menu>
                  </SUIForm>
              }
          />
        </Segment>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  register: form => dispatch(register(form))
})

export default Register = connect(
    null,
    mapDispatchToProps
)(Register)