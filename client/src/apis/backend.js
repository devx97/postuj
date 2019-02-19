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
    store.dispatch(logIn(result.headers.jwt))
    return result
  }
  return result
}, err => {
  console.log('Probably invalid token or some error')
  console.log(err.response.message)
  if (err.response.status === 401) {
    history.push('/login')
    store.dispatch(logOut())
  }
  return Promise.reject(err);
});

export default backend;