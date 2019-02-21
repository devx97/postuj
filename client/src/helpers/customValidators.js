import {addValidator} from "redux-form-validators"
import jwtdecode from 'jwt-decode'

export const usernameValidator = addValidator({
  defaultMessage: "Invalid username.",
  validator: (options, value, allValues) =>
      /^[a-zA-Z0-9]+([-_][a-zA-Z0-9]+)*[a-zA-Z0-9]$/.test(value)
})

export const passwordsMatch = addValidator({
  defaultMessage: "Passwords don't match.",
  validator: (options, value, allValues) => value === allValues.password
})

export const tokenValidator = addValidator({
  defaultMessage: "Token expired or invalid.",
  validator: (options, value, allValues) => {
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