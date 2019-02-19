import axios from "axios";
import store from '../store'
import {logIn, logOut} from "../actions";
import {history} from '../ExtendedBrowserRouter'

const backend = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    Authorization: localStorage.getItem('token')
  },
  timeout: 5000,
})

backend.interceptors.response.use(result => {
  if (result.headers.jwt) {
    console.log('Got refreshed token!')
    console.log(result.headers.jwt);
    store.dispatch(logIn(result.headers.jwt))
    return result
  }
  return result
}, err => {
  console.log('Probably invalid token or some error')
  console.log(err.response.message)
  if (err.response.status === 401) {
    store.dispatch(logOut())
  }
  return Promise.reject(err);
});

export default backend;