import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from "react-redux"
import {Form, Field} from "react-final-form"
import {required, length} from "redux-form-validators"

import {Button, Form as SUIForm, Menu, Message, Segment} from 'semantic-ui-react'
import {resetPassword} from "../../actions"
import {composeValidators, passwordsMatch, tokenValidator} from '../../helpers/customValidators'
import FormField from '../../components/auth/FormField'

class ResetPassword extends Component {
  componentWillMount() {
    if (this.props.isLogged) {
      this.props.history.goBack()
    }
  }

  render() {
    const linkToForgotPassword =
        <Link to={'/forgot-password'} style={{color: '#ccc'}}>Generate new token</Link>
    return (
        <Segment inverted>
          <Form
              initialValues={{resetToken: this.props.match.params.resetToken}}
              onSubmit={this.props.resetPassword}
              render={({handleSubmit, errors}) =>
                  <SUIForm
                      inverted
                      error={errors && true}
                      onSubmit={handleSubmit}>
                    <Field
                        name="newPassword"
                        label="New password"
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
                        name="newPassword2"
                        label="Confirm new password"
                        type="password"
                        autoComplete="new-password"
                        component={FormField}
                        validate={composeValidators(
                            required({msg: 'Required.'}),
                            length({min: 6, msg: 'Minimum 6 characters.'}),
                            length({max: 64, msg: 'Maximum 64 characters.'}),
                            passwordsMatch(
                                {pass2name: 'newPassword', msg: 'Passwords have to match.'}),
                        )}
                    />
                    <Field
                        name="resetToken"
                        type="hidden"
                        component="input"
                        validate={composeValidators(
                            required({msg: 'Required.'}),
                            tokenValidator({msg: 'Token expired or invalid.'}),
                        )}
                    />
                    {errors.resetToken &&
                    <Message error color={'black'} header={errors.resetToken}
                             content={linkToForgotPassword}/>}

                    <Menu secondary inverted style={{paddingLeft: '5px'}}>
                      <Button color="blue" type="submit" content={'Send'}/>
                      <Menu.Item position={'right'} as={Link} to={'/login'}
                                 content={'Log in instead'}/>
                    </Menu>
                  </SUIForm>}
          />
        </Segment>
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResetPassword)
