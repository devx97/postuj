import {SubmissionError} from "redux-form"

import backend from "../apis/backend"
import {history} from "../routes/ExtendedBrowserRouter"
import {LOGIN_WITH_TOKEN, LOGOUT_SUCCESS} from './types'

export const register = form => () =>
    backend.post('/auth/register', form)
    .then(() => {
      history.push('/')
      history.push('/login')
    })
    .catch(error => {
      if (error.response.status === 422 && error.response.data.errors) {
        throw new SubmissionError(error.response.data.errors)
      }
    })

export const logIn = form => () =>
    backend.post('/auth/login', form)
    .then(history.goBack)
    .catch(error => {
      if (error.response.status === 422 && error.response.data.errors) {
        throw new SubmissionError(error.response.data.errors)
      }
    })

export const logInWithToken = token => ({
  type: LOGIN_WITH_TOKEN,
  token
})

export const logOut = () => async dispatch => {
  try {
    await backend.get('/auth/logout')
  } catch (err) {
    console.log(err)
  }
  dispatch(logOutSuccess())
}

const logOutSuccess = () => ({
  type: LOGOUT_SUCCESS
})

export const forgotPassword = form => async () => {
  try {
    console.log(form)
    await backend.post('/auth/forgot-password', form)
    return Promise.reject(new SubmissionError({email: "Email sent."}))
  } catch (error) {
    if (error.response.status === 422 && error.response.data.errors) {
      throw new SubmissionError(error.response.data.errors)
    }
  }
}

export const resetPassword = form => async () => {
  try {
    console.log(form)
    await backend.post('/auth/reset-password', form)
    history.push('/')
    history.push('/login')
  } catch (error) {
    if (error.response.status === 422 && error.response.data.errors) {
      throw new SubmissionError(error.response.data.errors)
    }
  }
}