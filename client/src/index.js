import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux'
import {checkToken, logIn} from "./actions";
import jwtdecode from 'jwt-decode'
import store from './store'
import ExtendedBrowserRouter, {history} from "./ExtendedBrowserRouter";

const token = localStorage.getItem('token');
if (token) {
  const decodedToken = jwtdecode(token)
  if (Date.now() / 1000 < decodedToken.exp - 1) {
    console.log('Logging in with good token.')
    store.dispatch(logIn(token))
  } else {
    console.log('Checking if token is valid and refreshing if possible')
    store.dispatch(checkToken())
  }
}
ReactDOM.render(
    <Provider store={store}>
      <ExtendedBrowserRouter history={history}>
        <App/>
      </ExtendedBrowserRouter>
    </Provider>,
    document.getElementById('root'))
