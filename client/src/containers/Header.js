import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../actions'
import '../styles/Header.css'

function LoginButton() {
  return <a href="/login">Login</a>
}

function SignupButton() {
  return <a href="/signup">Signup</a>
}

function SignoutButton({ onLogout }) {
  return <button onClick={onLogout}>Signout</button>
}

function Header(props) {
  let button = null
  if (props.isAuthenticated) {
    button = (
      <li>
        <SignoutButton onLogout={props.signoutUser} />
      </li>
    )
  } else {
    button = (
      <li>
        <LoginButton /> <SignupButton />
      </li>
    )
  }
  return (
    <nav className="nav">
      <ul>
        <li className="brand">
          <Link to="/">Brand</Link>
        </li>
        {button}
      </ul>
    </nav>
  )
}

function mapStateToProps({ auth }) {
  return {
    isAuthenticated: auth.isAuthenticated
  }
}

export default connect(mapStateToProps, actions)(Header)
