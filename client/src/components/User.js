import React, { Component } from 'react'
import axios from 'axios'
import '../styles/App.css'

class User extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  addShop() {}

  render() {
    return (
      <div className="user-profile">
        <button onClick={this.addShop}>Register Your Shop</button>
      </div>
    )
  }
}

export default User
