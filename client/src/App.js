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
      errorMessage: '',
      successMessage: ''
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleFormSubmit(event) {
    event.preventDefault();
    axios
      .post('/api/users/signup', {
        email: this.state.email,
        password: this.state.password
      })
      .then(res => {
        this.setState({
          successMessage: 'Hurray, user created!',
          errorMessage: ''
        });
      })
      .catch(e => {
        this.setState({
          errorMessage: 'Sorry, invalid user data!',
          successMessage: ''
        });
      });
    this.setState({ email: '', password: '' });
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleFormSubmit}>
          <input
            name="email"
            value={this.state.email}
            onChange={this.handleInputChange}
          />
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleInputChange}
          />
          <input type="submit" value="Signup" />
        </form>
        {this.state.errorMessage ? <p>{this.state.errorMessage}</p> : ''}
        {this.state.successMessage ? <p>{this.state.successMessage}</p> : ''}
      </div>
    );
  }
}

export default App;
