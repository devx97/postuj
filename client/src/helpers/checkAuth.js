import jwtdecode from "jwt-decode";
import store from "./store";
import {logInWithToken} from "./actions";
import backend from "./apis/backend";

export default () =>{
  const token = localStorage.getItem('token');
  if (token && token.split(' ')[0] === 'Bearer') {
    const decodedToken = jwtdecode(token)
    if (Date.now() / 1000 < decodedToken.exp - 0) {
      console.log('Logging in with good token.')
      store.dispatch(logInWithToken(token))
    } else if ((Date.now() / 1000) - decodedToken.exp > 2 * 60 * 60) {
      localStorage.removeItem('token')
    } else {
      console.log('Checking if token is valid and refreshing if possible')
      backend.get('/auth/token')
      .then(res => {
        console.log('Logged in.')
      })
      .catch(err => {
        if (err.response.status === 401) {
          console.log('Provided token is probably invalid or 2 weeks old')
        }
      })
    }
  }
}