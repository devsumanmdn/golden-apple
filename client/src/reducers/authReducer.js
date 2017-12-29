import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from '../actions/types'

const initialState = {
  isAuthenticated: false,
  errorMessage: ''
}

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, isAuthenticated: true }
    case UNAUTH_USER:
      return { ...state, isAuthenticated: false }
    case AUTH_ERROR:
      return { ...state, errorMessage: action.payload }
    default:
      return state
  }
}
