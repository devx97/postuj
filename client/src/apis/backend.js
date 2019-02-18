import axios from "axios";
import {logIn} from "../actions";

const backend = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    Authorization: localStorage.getItem('token')
  },
  timeout: 5000,
})

backend.interceptors.response.use(result => {
  if (result.headers.jwt) {
    logIn(result.headers.jwt, result.data.user)
  }
  return result
}, err => {
  return Promise.reject(err);
});

export default backend;