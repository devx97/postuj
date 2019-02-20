import React, {Component} from 'react';
import {Route} from "react-router-dom";
import Header from "./components/layout/Header";
import Blog from "./pages/posts/Blog";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import './App.css';

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
          </div>
        </React.Fragment>
    );
  }
}

export default App;
