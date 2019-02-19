import backend from '../apis/backend'

export const addPost = content => {
  return dispatch => {
    backend.post('/post/new', {
      content
    })
    .then(result => {
      console.log(result);
    })
    .catch(error => {
      console.log(error);
    })
  }
}

const addPostSuccess = todo => ({
  type: 'ADD_POST_SUCCESS',
  todo
})

const addTodoFailure = error => ({
  type: 'ADD_TODO_FAILURE',
  payload: {
    error
  }
})

export const addPosts = posts => ({
  type: 'ADD_POSTS',
  posts
})

export const logIn = (token, user) => ({
  type: 'LOGIN',
  token,
  user,
})

export const logOut = () => ({
  type: 'LOGOUT',
})
