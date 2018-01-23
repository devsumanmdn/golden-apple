import axios from 'axios'
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from './types'

function authError(error) {
  return { type: AUTH_ERROR, payload: error }
}

export function signinUser(uid, password) {
  return function signin(dispatch) {
    axios
      .post('/api/users/login', { uid, password })
      .then(res => {
        if (res.data.token) {
          dispatch({ type: AUTH_USER })
          // eslint-disable-next-line no-undef
          localStorage.setItem('auth_token', res.data.token)
        }
      })
      .catch(e => {
        dispatch(authError(e.response.statusText))
      })
  }
}

export function signupUser(email, username, password) {
  return function signup(dispatch) {
    axios
      .post('/api/users/signup', { email, password, username })
      .then(res => {
        if (res.data.token) {
          dispatch({ type: AUTH_USER })
          // eslint-disable-next-line no-undef
          localStorage.setItem('auth_token', res.data.token)
        }
      })
      .catch(e => {
        dispatch(authError(e.response.statusText))
      })
  }
}

export function signoutUser() {
  return function signout(dispatch) {
    // eslint-disable-next-line no-undef
    localStorage.removeItem('auth_token')
    return dispatch({ type: UNAUTH_USER })
  }
}
