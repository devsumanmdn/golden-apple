import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Header from '../containers/Header'
import Home from '../components/Home'
import Login from '../containers/Login'
import Signup from '../containers/Signup'
import Dashboard from '../components/Dashboard'
import AddStore from '../containers/AddStore'
import Stores from '../components/stores'
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
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/addStore" component={AddStore} />
            <Route exact path="/stores" component={Stores} />
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default App
