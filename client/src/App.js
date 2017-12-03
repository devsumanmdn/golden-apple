import React, { Component } from 'react';
import SignupForm from './signup';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }  render() {
    return (
      <div>
        <header>
          <img src={logo} alt="My logo" width="100" height="100" />
        </header>
        <SignupForm />
      </div>
    );
  }
}

export default App;
