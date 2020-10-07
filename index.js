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

const app = express()
const port = process.env.PORT
const apiUrl = process.env.API_URL
const apiUrlHostname = new URL(apiUrl).hostname
const apiMatomoUrl = process.env.API_MATOMO_URL

const staticFileMiddleware = express.static(path.join(__dirname, 'dist'), {
  setHeaders: (res, path, stat) => {
    res.set({
      'Content-Security-Policy': `default-src 'none'; script-src 'self' ${apiMatomoUrl} 'sha256-4RS22DYeB7U14dra4KcQYxmwt5HkOInieXK1NUMBmQI='; style-src 'self' 'sha256-yUOnKCENzSdKikR9gEEAu8IogIBNlifamnNNH1E31SE='; connect-src 'self' ${apiUrlHostname} sentry.io; img-src data: 'self' ${apiMatomoUrl} a.tile.openstreetmap.org b.tile.openstreetmap.org c.tile.openstreetmap.org  a.tile.openstreetmap.fr b.tile.openstreetmap.fr c.tile.openstreetmap.fr geoservices.brgm.fr wxs.ign.fr; frame-src app.mailjet.com;`,
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'X-XSS-Protection': '1; mode=block',
      'Access-Control-Allow-Origin': '*'
    })
  }
})

app.use(
  '/api',
  createProxyMiddleware({
    target: apiUrl,
    pathRewrite: { '^/api': '' },
    changeOrigin: true
  })
)

app.use('/sentryDsn', (req, res) => res.send(process.env.API_SENTRY_URL))
app.use('/matomoOptions', (req, res) =>
  res.json({
    host: apiMatomoUrl,
    siteId: process.env.API_MATOMO_ID
  })
)

app.use(compression())
app.use('/', staticFileMiddleware)
app.use('/', history())
app.use('/', staticFileMiddleware)

app.listen(port, () => {
  console.info(`Server: ${port}`)
})
