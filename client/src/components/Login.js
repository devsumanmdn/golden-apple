import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      uid: '',
      password: '',
      loginMessage: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleFormSubmit(event) {
    event.preventDefault()

    axios
      .post('/api/users/login', {
        uid: this.state.uid,
        password: this.state.password
      })
      .then(res => {
        console.log(res)
        this.setState({ loginMessage: 'Login: Successful' })
      })
      .catch(e => {
        if (e.response) {
          this.setState({ loginMessage: 'Login: failed!' })
        }
      })
    this.setState({ password: '' })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <p className="form-title">Login</p>
          <input
            type="text"
            name="uid"
            placeholder="Email or Username"
            onChange={this.handleInputChange}
            value={this.state.email}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={this.handleInputChange}
            value={this.state.password}
            required
          />
          <input type="submit" value="Submit" />
        </form>
        <p>{this.state.loginMessage}</p>
      </div>
    )
  }
}

export default Login
