import React from 'react'
import { connect } from 'react-redux'
import '../styles/App.css'

function Dashboard(props) {
  return <div>Hello {props.username ? props.username : 'User'}</div>
}

function mapStateToProps({ auth }) {
  return {
    username: auth.username
  }
}

export default connect(mapStateToProps)(Dashboard)
