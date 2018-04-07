import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_USER
} from '../actions/types'

const initialState = {
  isAuthenticated: false,
  username: '',
  errorMessage: ''
}

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, isAuthenticated: true, username: action.payload }
    case UNAUTH_USER:
      return { ...state, isAuthenticated: false, username: '' }
    case AUTH_ERROR:
      return { ...state, errorMessage: action.payload }
    case FETCH_USER:
      return { ...state, isAuthenticated: null }
    default:
      return state
  }
}
