import axios from "axios";
import {logIn} from "../actions";
import {applyMiddleware as dispatch} from "redux";

const backend = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    Authorization: localStorage.getItem('token')
  },
  timeout: 5000,
})

backend.interceptors.response.use(result => {
  console.log(result);
  console.log('NEW TOKEN >>>');
  console.log(result.headers.jwt);
  console.log('NEW TOKEN <<<');
  console.log(typeof result.headers.jwt === 'string')
  console.log(result.headers.jwt instanceof String)
  if (result.headers.jwt) {
    console.log('new token!')
    console.log(result.headers.jwt)
    dispatch(logIn(result.headers.jwt, result.data.user))
    return result
  }
  return result
}, err => {
  return Promise.reject(err);
});

export default backend;