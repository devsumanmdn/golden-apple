import axios from 'axios'
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from './types'

export function signinUser(uid, password) {
  // eslint-disable-next-line
  return function(dispatch) {
    axios
      .post('/api/users/login', { uid, password })
      .then(res => {
        if (res.data.token) {
          dispatch({ type: AUTH_USER, payload: res.data.username })
          localStorage.setItem('auth_token', res.data.token)
          localStorage.setItem('username', res.data.username)
        }
      })
      .catch(e => {
        dispatch(authError(e.response.statusText))
      })
  }
}

export function signupUser(email, username, password) {
  // eslint-disable-next-line
  return function(dispatch) {
    axios
      .post('/api/users/signup', { email, password, username })
      .then(res => {
        if (res.data.token) {
          dispatch({ type: AUTH_USER })
          localStorage.setItem('auth_token', res.data.token)
        }
      })
      .catch(e => {
        dispatch(authError(e.response.statusText))
      })
  }
}

export function signoutUser() {
  localStorage.removeItem('auth_token')
  localStorage.removeItem('username')
  return { type: UNAUTH_USER }
}

function authError(error) {
  return { type: AUTH_ERROR, payload: error }
}
