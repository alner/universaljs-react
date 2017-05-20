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
import { createStore, combineReducers } from 'redux'

import App from './app'
import helloReducer from './reducer/hello'
import config from '../shared/config.json'

const { APP_SELECTOR } = config
const MOUNT_EL = document.querySelector(APP_SELECTOR)
const IS_PROD = process.env.NODE_ENV === 'production'

const store = createStore(combineReducers({ hello: helloReducer }), 
IS_PROD ? undefined : window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

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
