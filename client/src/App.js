import React, {Component} from 'react'
import {Route} from "react-router-dom"

import Header from "./components/layout/Header"
import Blog from "./pages/posts/Blog"
import SingleThread from './pages/posts/SingleThread'
import Login from "./pages/auth/Login"
import Register from './pages/auth/Register'
import ForgotPassword from "./pages/auth/ForgotPassword"
import ResetPassword from './pages/auth/ResetPassword'
import './App.css'
import {Container, Segment} from 'semantic-ui-react'

class App extends Component {
  render() {
    return (
        <React.Fragment>
          <Header/>
          <Container inverted style={{marginTop: '50px'}}>
            <Route exact path="/" component={Blog}/>
            <Route exact path="/p/:postId" component={SingleThread}/>
            <Route exact path="/p/:postId/:commentId" component={SingleThread}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/forgot-password" component={ForgotPassword}/>
            <Route exact path="/reset-password/:resetToken" component={ResetPassword}/>
          </Container>
        </React.Fragment>
    )
  }
}

export default App
