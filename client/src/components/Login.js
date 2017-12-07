import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = { email: '', password: '', loginMessage: '' }
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
        email: this.state.email,
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
    this.setState({ email: '', password: '' })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <input
            type="email"
            name="email"
            placeholder="email"
            onChange={this.handleInputChange}
            value={this.state.email}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={this.handleInputChange}
            value={this.state.password}
          />
          <input type="submit" value="Submit" />
        </form>
        <p>{this.state.loginMessage}</p>
      </div>
    )
  }
}

export default Login
