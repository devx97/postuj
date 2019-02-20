import React, {Component} from 'react'
import {Route} from "react-router-dom"

import Blog from "./pages/posts/Blog"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import ForgotPassword from "./pages/auth/ForgotPassword"
import Header from "./components/layout/Header"
import './App.css'

class App extends Component {
  render() {
    return (
        <React.Fragment>
          <div className="header">
            <Header/>
          </div>
          <div className="content">
            <Route exact path="/" component={Blog}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/forgot-password" component={ForgotPassword}/>
          </div>
        </React.Fragment>
    )
  }
}

export default App
