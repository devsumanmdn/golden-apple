import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import * as actions from '../actions'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      uid: '',
      password: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleInputChange(event) {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleFormSubmit(event) {
    event.preventDefault()
    const { uid, password } = this.state
    this.props.signinUser(uid, password)
  }

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />
    }
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
            placeholder="Password"
            onChange={this.handleInputChange}
            value={this.state.password}
            required
          />
          <input type="submit" value="Submit" />
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

export default connect(mapStateToProps, actions)(Login)
