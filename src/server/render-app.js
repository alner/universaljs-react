// @flow
import config from '../shared/config.json'

const { WDS_PORT, STATIC_PATH } = config

const isProd = process.env.NODE_ENV === 'production'

const renderApp = (title: string) =>
`<!doctype html>
<html>
  <head>
    <title>${title}</title>
    <link rel="stylesheet" href="${STATIC_PATH}/css/style.css">
  </head>
<body>
    <div class="js-app"></div>
    <script src="${isProd ? STATIC_PATH : `http://localhost:${WDS_PORT}/dist`}/bundle.js"></script>  
</body>
</html>
`

export default renderApp
