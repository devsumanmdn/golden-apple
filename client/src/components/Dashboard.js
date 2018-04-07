import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import '../styles/App.css'

function Dashboard(props) {
  if (!props.isAuthenticated) {
    return <Redirect to="/login" />
  }
  return <div>Hello {props.username ? props.username : 'User'}</div>
}

function mapStateToProps({ auth }) {
  return {
    isAuthenticated: auth.isAuthenticated,
    username: auth.username
  }
}

export default connect(mapStateToProps)(Dashboard)
