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
  }

  handleInputChange(event) {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />
    }
    return (
      <div>
        <form method="post" action="/api/users/login">
          <p className="form-title">Login</p>
          <input
            type="text"
            name="uid"
            placeholder="Email or Username"
            onChange={this.handleInputChange}
            value={this.state.uid}
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
