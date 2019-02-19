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
  .then(result => {
    console.log('No need to dispatch login action because token is already in headers')
  })
  .catch(error => {
    console.log('Provided token is probably invalid or 2 weeks old')
    console.log(error.message)
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
