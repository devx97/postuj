import backend from "../apis/backend";
import {reset, SubmissionError} from "redux-form";
import {ADD_POST_SUCCESS, ADD_POSTS} from "./types";

export const addPost = ({content}) => dispatch =>
    backend.post('/post/new', {
      content
    })
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

export const addPosts = posts => ({
  type: ADD_POSTS,
  posts
})
