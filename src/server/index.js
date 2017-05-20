// @flow
import express from 'express'
import compression from 'compression'
import config from '../shared/config.json'
import renderApp from './render-app'

const { APP_NAME, STATIC_PATH } = config
const PORT = process.env.PORT || config.PORT

const app = express()
app.use(compression())
app.use(STATIC_PATH, express.static('dist'))
app.use(STATIC_PATH, express.static('public'))

app.get('/', (req, res) => {
  res.send(renderApp(APP_NAME))
})

app.listen(PORT, () => console.log(`Running http://localhost:${PORT}`))
