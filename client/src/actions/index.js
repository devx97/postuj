export const addPost = post => ({
  type: 'ADD_POST',
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