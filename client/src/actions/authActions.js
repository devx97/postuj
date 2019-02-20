import backend from "../apis/backend";
import {history} from "../ExtendedBrowserRouter";
import {SubmissionError} from "redux-form";
import {LOGIN_WITH_TOKEN, LOGOUT_SUCCESS} from './types'

export const register = form => () =>
    backend.put('/auth/register', form)
    .then(result => {
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
    .then(result => {
      history.goBack()
    })
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
    dispatch(logOutSuccess())
  } catch (err) {
    console.log(err)
  }
}

const logOutSuccess = () => ({
  type: LOGOUT_SUCCESS
})
