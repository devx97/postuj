import {ADD_POST_SUCCESS, ADD_POSTS, PLUS_POST_SUCCESS, ADD_COMMENT_SUCCESS} from "../actions/types"

const posts = (state = [], action) => {
  switch (action.type) {
    case ADD_POST_SUCCESS:
      return [action.post, ...state].splice(0, 10)
    case ADD_POSTS:
      return [...action.posts]
    case PLUS_POST_SUCCESS:
      return state.map(post => {
        if (post.postId === action.postId) {
          post.pluses = action.pluses
        }
        return post
      })
    case ADD_COMMENT_SUCCESS:
      console.log(action.newComment)
      console.log(action.postId)
      return state
    default:
      return state
  }
}

export default posts