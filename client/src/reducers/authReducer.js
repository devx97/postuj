const auth = (state = {isLogged: false, token: null}, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('token', `Bearer ${action.token}`);
      return {isLogged: true, token: action.token}
    case 'LOGOUT':
      localStorage.removeItem('token')
      return {isLogged: false, token: null}
    default:
      return state
  }
}

export default auth