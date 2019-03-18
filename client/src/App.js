import React, {Component} from 'react'
import {Route} from "react-router-dom"
import {hot} from 'react-hot-loader'

import Header from "./components/layout/Header"
import Blog from "./pages/posts/Blog"
import SingleThread from './pages/posts/SingleThread'
import Login from "./pages/auth/Login"
import Register from './pages/auth/Register'
import ForgotPassword from "./pages/auth/ForgotPassword"
import ResetPassword from './pages/auth/ResetPassword'
import {Container, Segment} from 'semantic-ui-react'

class App extends Component {
  render() {
    return (
        <React.Fragment>
          <Header/>
          <Container text style={{paddingTop: '60px'}}>
            <Route exact path="/" component={Blog}/>
            <Route exact path="/p/:postId" component={SingleThread}/>
            <Route exact path="/p/:postId/:commentId" component={SingleThread}/>
          </Container>
          <Container style={{width: 420}}>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/register" component={Register}/>
              <Route exact path="/forgot-password" component={ForgotPassword}/>
              <Route exact path="/reset-password/:resetToken" component={ResetPassword}/>
          </Container>
        </React.Fragment>
    )
  }
}

export default hot(module)(App)
