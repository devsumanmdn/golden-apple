import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Header from '../components/Header'
import Home from '../components/Home'
import Login from '../components/Login'
import Signup from '../components/Signup'
// import './styles/App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default App
