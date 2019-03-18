import React, {Component} from 'react'
import {connect} from "react-redux"
import {Form, Field} from "react-final-form"
import {required, length, email} from "redux-form-validators"

import {Button, Form as SUIForm, Menu, Message, Segment} from 'semantic-ui-react'
import {forgotPassword} from "../../actions"
import {Link} from 'react-router-dom'
import {composeValidators} from '../../helpers/customValidators'
import FormField from '../../components/auth/FormField'

class ForgotPassword extends Component {
  render() {
    return (
        <Segment inverted>
          <Form
              onSubmit={this.props.forgotPassword}
              render={({handleSubmit, errors, submitSucceeded, dirtySinceLastSubmit}) =>
                  <SUIForm
                      inverted
                      success={submitSucceeded && !dirtySinceLastSubmit}
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
                    {submitSucceeded && !dirtySinceLastSubmit && <Message success
                                                                          content={"Email sent."}/>}
                    <Menu secondary inverted style={{paddingLeft: '5px'}}>
                      <Button color="blue" type="submit" content={'Send'}/>
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
  forgotPassword: form => dispatch(forgotPassword(form))
})

export default ForgotPassword = connect(
    null,
    mapDispatchToProps
)(ForgotPassword)