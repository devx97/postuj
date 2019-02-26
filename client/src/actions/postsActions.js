import {reset, SubmissionError} from "redux-form"

import backend from "../apis/backend"
import {ADD_COMMENT_SUCCESS, ADD_POST_SUCCESS, ADD_POSTS, PLUS_POST_SUCCESS} from "./types"

export const addPost = ({content}) => dispatch =>
    backend.post('/post/new', {content})
    .then(result => {
      dispatch(addPostSuccess(result.data))
      dispatch(reset('newPost'))
    })
    .catch(error => {
      if (error.response.status === 422 && error.response.data.errors) {
        throw new SubmissionError(error.response.data.errors)
      }
    })

const addPostSuccess = post => ({
  type: ADD_POST_SUCCESS,
  post
})

export const fetchPosts = () => dispatch =>
    backend.get('/posts')
    .then(result => {
      dispatch(addPosts(result.data))
    })
    .catch(console.log)

export const addPosts = posts => ({
  type: ADD_POSTS,
  posts
})

export const plusPost = postId => dispatch =>
    backend.post('/post/plus/', {postId})
    .then(result => {
      dispatch(plusPostSuccess(result.data))
    })

const plusPostSuccess = ({postId, pluses}) => ({
  type: PLUS_POST_SUCCESS,
  postId,
  pluses,
})

export const reply = ({content}, postId) => dispatch =>
    backend.post('/post/new-comment', {postId, content})
    .then(result => {
      dispatch(addCommentSuccess(result.data, postId))
      dispatch(reset(`form-postId-${postId}`))
    })
    .catch(error => {
      if (error.response.status === 422 && error.response.data.errors) {
        throw new SubmissionError(error.response.data.errors)
      }
    })

const addCommentSuccess = (newComment, postId) => ({
  type: ADD_COMMENT_SUCCESS,
  newComment,
  postId
})