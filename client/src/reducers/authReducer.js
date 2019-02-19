const auth = (state = {isLogged: false, token: null, user: {}}, action) => {
  switch (action.type) {
    case 'LOGIN':
      let token = action.token
      if (token.split(' ')[0].toString() !== 'Bearer') {
        token = `Bearer ${token}`
      }
      localStorage.setItem('token', token);
      return {isLogged: true, token, user: action.user}
    case 'LOGOUT':
      localStorage.removeItem('token')
      return {isLogged: false, token: null, user: {}}
    default:
      return state
  }
}

export default auth