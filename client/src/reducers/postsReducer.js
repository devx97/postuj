import {ADD_POST_SUCCESS, ADD_POSTS} from "../actions/types"

const posts = (state = [], action) => {
  switch (action.type) {
    case ADD_POST_SUCCESS:
      return [action.post, ...state].splice(0, 10)
    case ADD_POSTS:
      return [...action.posts]
    default:
      return state
  }
}

export default posts