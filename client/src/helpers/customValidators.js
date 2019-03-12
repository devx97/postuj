import {addValidator} from "redux-form-validators"
import jwtdecode from 'jwt-decode'

export const composeValidators = (...validators) => (options, value, allValues) =>
        validators.reduce((error, validator) => error || validator(options, value, allValues), undefined)

export const usernameValidator = addValidator({
  defaultMessage: "Invalid username.",
  validator: (options, value) =>
      /^[a-zA-Z0-9]+([-_][a-zA-Z0-9]+)*[a-zA-Z0-9]$/.test(value)
})

export const passwordsMatch = addValidator({
  defaultMessage: "DEV - Provide password field name. validator({pass2name: 'passwordFieldName'})",
  validator: (options, value, allValues) => value === allValues[options.pass2name]
})

export const tokenValidator = addValidator({
  defaultMessage: "Token expired or invalid.",
  validator: (options, value) => {
    try {
      const decodedToken = jwtdecode(value)
      if (decodedToken.exp > Date.now() / 1000) {
        console.log(decodedToken)
        return true
      }
    } catch (err) {
      console.log(err)
    }
    return false
  }
})
