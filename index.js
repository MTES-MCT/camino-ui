/**
 * Camino API, le cadastre minier numérique ouvert
 *
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 */

require('dotenv').config()
const path = require('path')
const express = require('express')
const history = require('connect-history-api-fallback')
const compression = require('compression')
const { createProxyMiddleware } = require('http-proxy-middleware')
const { version } = require('./package.json')

const app = express()
const port = process.env.PORT
const apiUrl = process.env.API_URL
const apiMatomoUrl = process.env.API_MATOMO_URL

const staticFileMiddleware = express.static(path.join(__dirname, 'dist'), {
  setHeaders: (res, path, stat) => {
    res.set({
      'Content-Security-Policy': `default-src 'self'; script-src 'self' ${apiMatomoUrl} 'sha256-4RS22DYeB7U14dra4KcQYxmwt5HkOInieXK1NUMBmQI=' blob:; style-src 'self' 'sha256-kwpt3lQZ21rs4cld7/uEm9qI5yAbjYzx+9FGm/XmwNU='; connect-src 'self' ${apiUrl} sentry.io ${apiMatomoUrl}; img-src data: 'self' ${apiMatomoUrl} a.tile.openstreetmap.org b.tile.openstreetmap.org c.tile.openstreetmap.org  a.tile.openstreetmap.fr b.tile.openstreetmap.fr c.tile.openstreetmap.fr geoservices.brgm.fr wxs.ign.fr; frame-src app.mailjet.com;`,
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'X-XSS-Protection': '1; mode=block',
      'Access-Control-Allow-Origin': '*'
    })
  }
})

app.use(
  '/apiUrl',
  createProxyMiddleware({
    target: apiUrl,
    changeOrigin: true,
    pathRewrite: { '^/apiUrl': '' }
  })
)
app.use('/sentryOptions', (req, res) =>
  res.json({
    dsn: process.env.API_SENTRY_URL,
    environment: process.env.ENV
  })
)
app.use('/matomoOptions', (req, res) =>
  res.json({
    host: apiMatomoUrl,
    siteId: process.env.API_MATOMO_ID
  })
)

const sendVersion = context => {
  const headers = {
    'Content-Type': 'text/event-stream',
    Connection: 'keep-alive',
    'Cache-Control': 'no-cache'
  }

  context.writeHead(200, headers)
  context.write(`id: ${Date.now()}\n`)
  context.write(`event: version\n`)
  context.write(`data: ${version}\n\n`)
}

app.get('/stream/version', async (req, res) => {
  sendVersion(res)
})

app.use(compression())
app.use('/', staticFileMiddleware)
app.use('/', history())
// https://stackoverflow.com/a/52327421/2112538
app.use('/', staticFileMiddleware)

app.listen(port, () => {
  console.info(`Server: ${port}`)
})
