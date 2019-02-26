import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'

import store from './store'
import checkAuth from './helpers/checkAuth'
import ExtendedBrowserRouter, {history} from "./routes/ExtendedBrowserRouter"
import App from './App'
import './index.css'

checkAuth()

ReactDOM.render(
    <Provider store={store}>
      <ExtendedBrowserRouter history={history}>
        <App/>
      </ExtendedBrowserRouter>
    </Provider>,
    document.getElementById('root'))
