import jwtdecode from 'jwt-decode'

import {LOGIN_WITH_TOKEN, LOGOUT_SUCCESS} from "../actions/types"

const auth = (state = {isLogged: false, token: null, user: {}}, action) => {
  switch (action.type) {
    case LOGIN_WITH_TOKEN:
      let token = action.token
      const decodedToken = jwtdecode(token)
      if (token.split(' ')[0].toString() !== 'Bearer') {
        token = `Bearer ${token}`
      }
      localStorage.setItem('token', token)
      return {isLogged: true, token, user: {...decodedToken}}
    case LOGOUT_SUCCESS:
      localStorage.removeItem('token')
      return {isLogged: false, token: null, user: {}}
    default:
      return state
  }
}

export default auth