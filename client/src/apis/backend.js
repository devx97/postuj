import axios from "axios"
import jwtdecode from 'jwt-decode'

import store from '../store'

import {logInWithToken, logOut} from "../actions"

const backend = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 5000
})

backend.interceptors.request.use(request => {
  try {
    if (!localStorage.getItem('token')) {
      return request
    }
    jwtdecode(localStorage.getItem('token'))
    request.headers.Authorization = localStorage.getItem('token')
  } catch (err) {
    console.log('Invalid token.')
  }
  return request
})

// on each response check, even if its error, check for jwt and update if there is one
backend.interceptors.response.use(
    result => {
      if (result.headers.jwt) {
        store.dispatch(logInWithToken(result.headers.jwt))
      } else if (localStorage.getItem('token')) {
        store.dispatch(logInWithToken(localStorage.getItem('token')))
      }
      return result
    },
    err => {
      if (err.response.status === 401) {
        store.dispatch(logOut())
      } else {
        if (err.response.headers.jwt) {
          store.dispatch(logInWithToken(err.response.headers.jwt))
        } else if (localStorage.getItem('token')) {
          store.dispatch(logInWithToken(localStorage.getItem('token')))
        }
      }
      return Promise.reject(err)
    }
)

export default backend