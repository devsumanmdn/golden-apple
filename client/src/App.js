import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      username: '',
      errorMessage: '',
      successMessage: '',
      usernameExist: '',
      emailExist: ''
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.checkExistance = this.checkExistance.bind(this);
  }

  handleFormSubmit(event) {
    event.preventDefault();
    axios
      .post('/api/users/signup', {
        email: this.state.email,
        password: this.state.password,
        username: this.state.username
      })
      .then(res => {
        console.log(res.data);
        this.setState({
          successMessage: res.data,
          errorMessage: ''
        });
      })
      .catch(e => {
        this.setState({
          errorMessage: 'Sorry, invalid user data!',
          successMessage: ''
        });
      });
    this.setState({ email: '', password: '', username: '' });
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });

    // check existance of email and username
    if (event.target.name === 'email' || event.target.name === 'username') {
      // this.setState({ [event.target.name + 'Exist']: 's' });
      axios
        .post('/api/users/query', {
          name: event.target.name,
          value: event.target.value
        })
        .then(res => {
          if (res.data !== false) {
            this.setState({ [res.data + 'Exist']: `exist_err` });
          } else {
            this.setState({ [event.target.name + 'Exist']: '' });
          }
        })
        .catch(e => {
          console.log(e);
          // this.setState({
          //   [event.target.name + 'Exist']: ''
          // });
        });
    }
  }

  checkExistance(event) {}
  render() {
    return (
      <div>
        <header>
          <img src={logo} alt="My logo" width="100" height="100" />
        </header>
        <div className="App">
          <form onSubmit={this.handleFormSubmit}>
            <input
              name="email"
              className={this.state.emailExist}
              value={this.state.email}
              onChange={this.handleInputChange}
              placeholder="Enter Your Email"
              onBlur={this.checkExistance}
            />
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleInputChange}
              placeholder="Password"
            />
            <input
              type="text"
              className={this.state.usernameExist}
              name="username"
              value={this.state.username}
              onChange={this.handleInputChange}
              onBlur={this.checkExistance}
              placeholder="Choose Username"
            />
            <input
              type="submit"
              value="Signup"
              disabled={
                this.state.emailExist !== '' || this.state.usernameExist !== ''
              }
            />
          </form>
          {this.state.errorMessage !== '' ? (
            <p>{this.state.errorMessage}</p>
          ) : (
            ''
          )}
          {this.state.successMessage !== '' ? (
            <p>{this.state.successMessage}</p>
          ) : (
            ''
          )}
          {this.state.emailExist !== '' ? <p>{this.state.emailExist}</p> : ''}
          {this.state.usernameExist !== '' ? (
            <p>{this.state.usernameExist}</p>
          ) : (
            ''
          )}
        </div>
      </div>
    );
  }
}

export default App;
