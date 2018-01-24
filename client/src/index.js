import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import reduxThunk from 'redux-thunk'
import axios from 'axios'
import { createStore, applyMiddleware } from 'redux'
import App from './components/App'
import reducers from './reducers'
import { AUTH_USER, UNAUTH_USER } from './actions/types'
import registerServiceWorker from './registerServiceWorker'
import './index.css'

const store = createStore(reducers, {}, applyMiddleware(reduxThunk))
axios
  .get('/api/current_user')
  .then(res => {
    if (res.data) {
      store.dispatch({ type: AUTH_USER, payload: res.data.username })
    }
  })
  // eslint-disable-next-line no-unused-vars
  .catch(e => {
    store.dispatch({ type: UNAUTH_USER })
  })

store.getState()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') // eslint-disable-line
)
registerServiceWorker()
