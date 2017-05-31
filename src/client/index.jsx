// @flow
/* eslint-disable no-console */
/*
import Dog from './dog'
const dog = new Dog('Test')
console.log(`Hello ${dog.bark()}!`)
*/
import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'

import App from './app'
import helloReducer from './reducer/hello'
import config from '../shared/config.json'

const { APP_SELECTOR } = config
const MOUNT_EL = document.querySelector(APP_SELECTOR)
const IS_PROD = process.env.NODE_ENV === 'production'

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = (IS_PROD ? null : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

const store = createStore(combineReducers({ hello: helloReducer }),
  composeEnhancers(applyMiddleware(thunkMiddleware)))

const wrapApp = (AppComponent, reduxStore) =>
  <Provider store={reduxStore}>
    <AppContainer>
      <AppComponent />
    </AppContainer>
  </Provider>

ReactDOM.render(wrapApp(App, store), MOUNT_EL)

if (module.hot) {
  // flow-disable-next-line
  module.hot.accept('./app', () => {
    // eslint-disable-next-line global-require
    const NextApp = require('./app').default
    ReactDOM.render(wrapApp(NextApp, store), MOUNT_EL)
  })
}
