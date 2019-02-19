import backend from '../apis/backend'

export const addPost = content => dispatch => {
  backend.post('/post/new', {
    content
  })
  .then(result => {
    dispatch(addPostSuccess(result.data))
  })
  .catch(error => {
    console.log(error);
  })
}

export const checkToken = () => dispatch => {
  backend.get('/auth/token')
  .then(result => dispatch(logIn(result.data.token)))
  .catch(error => {
    console.log(error)
  })
}


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

export const logOut = () => ({
  type: 'LOGOUT',
})
