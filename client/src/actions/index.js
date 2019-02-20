import {reset} from "redux-form";
import backend from '../apis/backend'
import {SubmissionError} from 'redux-form';

export const addPost = ({content}) => dispatch =>
    backend.post('/post/new', {
      content
    })
    .then(result => {
      dispatch(addPostSuccess(result.data))
      dispatch(reset('newPost'))
    })
    .catch(error => {
      if (error.response.data.errors) {
        throw new SubmissionError(error.response.data.errors)
      }
    })

const addPostSuccess = post => ({
  type: 'ADD_POST_SUCCESS',
  post
})

export const addPosts = posts => ({
  type: 'ADD_POSTS',
  posts
})

export const logIn = token => ({
  type: 'LOGIN',
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

export const logOutSuccess = () => ({
  type: 'LOGOUT_SUCCESS'
})

export const register = form => dispatch =>
    backend.put('/auth/register', form)
    .then(result => {
      dispatch(reset('register'))
    })
    .catch(error => {
      console.log(form);
        if (error.response.data.errors) {
          throw new SubmissionError(error.response.data.errors)
        }
    })