import axios from "axios";
import store from '../store'
import {logIn} from "../actions";
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
    store.dispatch(logIn(result.headers.jwt))
    return result
  }
  return result
}, err => {
  if (err.response.status === 401)
    history.push('/login')
  return Promise.reject(err);
});

export default backend;