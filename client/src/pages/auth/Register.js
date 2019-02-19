import React, {Component} from 'react';
import './Auth.css'
import backend from '../../apis/backend'

class Register extends Component {

  state = {
    name: '',
    email: '',
    password: '',
    password2: '',
    errors: {
      name: '',
      email: '',
      password: '',
      password2: '',
    }
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleRegister = async event => {
    event.preventDefault()
    console.log(this.state)
    try {
      await backend.put('/auth/register', {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        password2: this.state.password2
      })
      this.props.history.push('/login')
    } catch (err) {
      this.setState(prev => {
        prev.errors = {
            name: '',
            email: '',
            password: '',
            password2: '',
        }
        err.response.data.data.map(error => prev.errors[error.param] = error.msg)
        return prev // but updated
      })
    }
  }

  render() {
    return (
        <div className="auth-form">
          <form onSubmit={this.handleRegister}>
            <div className="auth-item">
              <label>Name</label>
              <input name="name" placeholder="Enter name"
                     className={this.state.errors.name.length ? 'error': ''}
                     onChange={this.handleChange}
                     value={this.state.name}
                     required/>
                     <div>{this.state.errors.name}</div>
            </div>
            <div className="auth-item">
              <label>Email</label>
              <input type="email" name="email" placeholder="Enter email"
                     className={this.state.errors.email.length ? 'error': ''}
                     onChange={this.handleChange}
                     value={this.state.email}
                     required/>
              <div>{this.state.errors.email}</div>
            </div>
            <div className="auth-item">
              <label>Password</label>
              <input type="password" name="password"
                     className={this.state.errors.password.length ? 'error': ''}
                     onChange={this.handleChange}
                     value={this.state.password}
                     placeholder="Enter password" required/>
              <div>{this.state.errors.password}</div>
            </div>
            <div className="auth-item">
              <label>Confirm Password</label>
              <input type="password" name="password2"
                     className={this.state.errors.password2.length ? 'error': ''}
                     onChange={this.handleChange}
                     value={this.state.password2}
                     placeholder="Enter password" required/>
              <div>{this.state.errors.password2}</div>
            </div>
            <div className="auth-item btn">
              <button type="submit">Register</button>
            </div>
          </form>
        </div>
    );
  }
}

export default Register;