import {reset, SubmissionError} from "redux-form"

import backend from "../apis/backend"
import {ADD_COMMENT_SUCCESS, ADD_POST_SUCCESS, ADD_POSTS, PLUS_POST_SUCCESS, EDIT_POST_SUCCESS} from "./types"

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

export const plusPost = (postId, commentId) => dispatch =>
    backend.post('/post/plus/', {postId, commentId})
    .then(result => {
      dispatch(plusPostSuccess(postId, commentId, result.data.pluses))
    })

const plusPostSuccess = (postId, commentId, pluses) => ({
  type: PLUS_POST_SUCCESS,
  postId,
  commentId,
  pluses,
})

export const reply = (postId, content) => dispatch => {
  return backend.post('/post/new-comment', {postId, content})
  .then(result => {
    dispatch(addCommentSuccess(result.data, postId))
    dispatch(reset(`form-p-${postId}`))
  })
  .catch(error => {
    if (error.response.status === 422 && error.response.data.errors) {
      throw new SubmissionError(error.response.data.errors)
    }
  })
}

const addCommentSuccess = (newComment, postId) => ({
  type: ADD_COMMENT_SUCCESS,
  newComment,
  postId
})

export const editPost = (content, postId, commentId) => dispatch =>
    backend.post('/post/edit', {content, postId, commentId})
    .then(result => {
      console.log(result.data)
      dispatch(editPostSuccess(content, postId, commentId))
    })
    .catch(error => {
      if (error.response.status === 422 && error.response.data.errors) {
        throw new SubmissionError(error.response.data.errors)
      } else {
        console.log(error)
      }
    })

const editPostSuccess = (content, postId, commentId) => ({
  type: EDIT_POST_SUCCESS,
  content,
  postId,
  commentId,
})
