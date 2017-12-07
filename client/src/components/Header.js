import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Header.css'
import logo from '../logo.svg'

class Header extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <nav className="nav">
        <ul>
          <li className="brand">
            <Link to="/">Brand</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
        </ul>
      </nav>
    )
  }
}

export default Header
