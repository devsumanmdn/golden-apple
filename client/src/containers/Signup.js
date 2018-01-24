import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import axios from 'axios'
import * as actions from '../actions'
import '../styles/App.css'

class SignupForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      username: '',
      usernameExist: '',
      emailExist: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(event) {
    event.persist()
    const { name } = event.target
    let { value } = event.target
    if (name === 'email' || name === 'username') {
      value = value.toLowerCase()
    }

    this.setState({ [name]: value })

    // check existance of email and username
    if (name === 'email' || name === 'username') {
      this.setState({ [`${name}Exist`]: 's' })
      axios
        .post('/api/users/query', {
          prop: name,
          value
        })
        .then(res => {
          if (process.env.NODE_ENV === 'development') {
            console.log(res.data)
          }
          if (res.data !== false) {
            this.setState({ [`${res.data}Exist`]: 'exist_err' })
          } else {
            this.setState({ [`${name}Exist`]: '' })
          }
        })
        .catch(e => {
          if (process.env.NODE_ENV === 'development') {
            console.log(e)
          }
          this.setState({
            [`${name}Exist`]: ''
          })
        })
    }
  }

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />
    }
    return (
      <div className="SignupForm">
        <form method="post" action="/api/users/signup">
          <p className="form-title">Sign Up</p>
          <input
            name="email"
            type="email"
            className={this.state.emailExist}
            value={this.state.email}
            onChange={this.handleInputChange}
            placeholder="Enter Your Email"
            onBlur={this.checkExistance}
            required
          />
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleInputChange}
            placeholder="Password"
            required
          />
          <input
            type="text"
            className={this.state.usernameExist}
            name="username"
            value={this.state.username}
            onChange={this.handleInputChange}
            onBlur={this.checkExistance}
            placeholder="Choose Username"
            required
          />
          <input
            type="submit"
            value="Signup"
            disabled={
              this.state.emailExist !== '' || this.state.usernameExist !== ''
            }
          />
        </form>
        <p>{this.props.errorMessage}</p>
      </div>
    )
  }
}

function mapStateToProps({ auth }) {
  return {
    errorMessage: auth.errorMessage,
    isAuthenticated: auth.isAuthenticated
  }
}

export default connect(mapStateToProps, actions)(SignupForm)
