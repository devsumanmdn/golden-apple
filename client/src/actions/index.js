import axios from 'axios'
import { AUTH_ERROR } from './types'

function authError(error) {
  return { type: AUTH_ERROR, payload: error }
}

// eslint-disable-next-line import/prefer-default-export
export function addStore(name, description, location) {
  return function addShop(dispatch) {
    axios
      .post('/api/store/add', {
        name,
        description,
        location
      })
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
