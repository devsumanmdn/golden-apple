import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import uuid from 'uuid'
import * as actions from '../actions'
import '../styles/Header.css'

function LoginButton() {
  return <a href="/login">Login</a>
}

function SignupButton() {
  return <a href="/signup">Signup</a>
}

// eslint-disable-next-line react/prop-types
function SignoutButton() {
  return <a href="/api/logout">Signout</a>
}

function DashboardButton() {
  return <Link to="/dashboard">Dashboard</Link>
}

function AddShopButton() {
  return <Link to="/addStore">Add Shop</Link>
}

function GoogleAuth() {
  return <a href="/auth/google">Google</a>
}

function FacebookAuth() {
  return <a href="/auth/facebook">Facebook</a>
}

function Header(props) {
  function renderHeaderLinks() {
    // eslint-disable-next-line react/prop-types
    switch (props.isAuthenticated) {
      case true:
        return [
          <ul key={uuid()} className="nav-rightLinks">
            <li key={uuid()}>
              <DashboardButton />
            </li>
            <li key={uuid()}>
              <AddShopButton />
            </li>
            <li key={uuid()}>
              <SignoutButton />
            </li>
          </ul>
        ]
      case false:
        return [
          <ul key={uuid()} className="nav-rightLinks">
            <li key={uuid()}>
              <LoginButton />
            </li>
            <li key={uuid()}>
              <SignupButton />
            </li>
            <li key={uuid()}>
              <GoogleAuth />
            </li>
            <li key={uuid()}>
              <FacebookAuth />
            </li>
          </ul>
        ]
      default:
        return null
    }
  }
  return (
    <div className="navbar">
      <nav className="nav">
        <ul key={uuid()} className="nav-leftLinks">
          <li className="brand" key={uuid()}>
            <Link to="/">Golden-Apple</Link>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li key={uuid()}>
            <Link to="/stores">Stores</Link>
          </li>
        </ul>
        {renderHeaderLinks()}
      </nav>
    </div>
  )
}

function mapStateToProps({ auth }) {
  return {
    isAuthenticated: auth.isAuthenticated
  }
}

export default connect(mapStateToProps, actions)(Header)
