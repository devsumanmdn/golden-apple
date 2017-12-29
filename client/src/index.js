import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import reduxThunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import App from './components/App'
import reducers from './reducers'
import { AUTH_USER } from './actions/types'
import registerServiceWorker from './registerServiceWorker'
import './index.css'

const store = createStore(reducers, {}, applyMiddleware(reduxThunk))
const token = localStorage.getItem('auth_token')
if (token) {
  store.dispatch({ type: AUTH_USER })
}

store.getState()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
