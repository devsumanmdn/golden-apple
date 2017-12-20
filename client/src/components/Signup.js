import React, { Component } from 'react'
import axios from 'axios'
import '../styles/App.css'

class SignupForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      username: '',
      errorMessage: '',
      successMessage: '',
      usernameExist: '',
      emailExist: ''
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.checkExistance = this.checkExistance.bind(this)
  }

  handleFormSubmit(event) {
    event.preventDefault()
    axios
      .post('/api/users/signup', {
        email: this.state.email,
        password: this.state.password,
        username: this.state.username
      })
      .then(res => {
        console.log(res.data)
        this.setState({
          successMessage: 'Signup Successful',
          errorMessage: ''
        })
      })
      .catch(e => {
        this.setState({
          errorMessage: 'Sorry, invalid user data!',
          successMessage: ''
        })
      })
    this.setState({ email: '', password: '', username: '' })
  }

  handleInputChange(event) {
    event.persist()
    this.setState({
      successMessage: ''
    })
    if (event.target.name === 'email' || event.target.name === 'username') {
      event.target.value = event.target.value.toLowerCase()
    }

    this.setState({ [event.target.name]: event.target.value })

    // check existance of email and username
    if (event.target.name === 'email' || event.target.name === 'username') {
      this.setState({ [event.target.name + 'Exist']: 's' })
      axios
        .post('/api/users/query', {
          prop: event.target.name,
          value: event.target.value
        })
        .then(res => {
          console.log(res.data)
          if (res.data !== false) {
            this.setState({ [res.data + 'Exist']: `exist_err` })
          } else {
            this.setState({ [event.target.name + 'Exist']: '' })
          }
        })
        .catch(e => {
          console.log(e)
          this.setState({
            [event.target.name + 'Exist']: ''
          })
        })
    }
  }

  checkExistance(event) {}
  render() {
    return (
      <div className="SignupForm">
        <form onSubmit={this.handleFormSubmit}>
          <p className="form-title">Sign Up</p>
          <input
            name="email"
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
            minLength="5"
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
        {this.state.errorMessage !== '' ? <p>{this.state.errorMessage}</p> : ''}
        {this.state.successMessage !== '' ? (
          <p>{this.state.successMessage}</p>
        ) : (
          ''
        )}
        {this.state.emailExist === 'exist_err' ? (
          <p>Email Already Registered! Try Login</p>
        ) : (
          ''
        )}
        {this.state.usernameExist === 'exist_err' ? (
          <p>Username Already Taken! </p>
        ) : (
          ''
        )}
      </div>
    )
  }
}

export default SignupForm
