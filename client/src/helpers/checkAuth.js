import jwtdecode from "jwt-decode";

import backend from "../apis/backend";
import store from "../store";
import {logInWithToken} from "../actions";

export default () =>{
  const token = localStorage.getItem('token');
  if (token && token.split(' ')[0] === 'Bearer') {
    const decodedToken = jwtdecode(token)
    if (Date.now() / 1000 < decodedToken.exp) {
      console.log('Logging in with good token.')
      store.dispatch(logInWithToken(token))
    } else if ((Date.now() / 1000) - decodedToken.exp > 2 * 60 * 60) {
      localStorage.removeItem('token')
    } else {
      console.log('Checking if token is valid and refreshing if possible')
      backend.get('/auth/token')
      .then(res => {
        console.log('Got new token, logging in.')
      })
      .catch(err => {
        if (err.response.status === 401) {
          console.log('Provided token is probably invalid or 2 weeks old')
        }
      })
    }
  }
}