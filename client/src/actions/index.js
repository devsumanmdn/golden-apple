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

export function addStore(name, description, location) {
  return function(dispatch) {
    axios
      .post(
        '/api/store/add',
        {
          name,
          description,
          location
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`
          }
        }
      )
      .then(res => {
        if (res.data === 'Done') {
          alert('Store Added')
        }
      })
      .catch(e => {
        dispatch(authError(e.response.statusText))
      })
  }
}

function authError(error) {
  return { type: AUTH_ERROR, payload: error }
}
