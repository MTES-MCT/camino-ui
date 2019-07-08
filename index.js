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

const app = express()
const staticFileMiddleware = express.static(path.join(__dirname, 'dist'), {
  setHeaders: (res, path, stat) => {
    res.set({
      'Content-Security-Policy': `default-src 'none'; script-src 'self' 'sha256-4RS22DYeB7U14dra4KcQYxmwt5HkOInieXK1NUMBmQI=' stats.data.gouv.fr; style-src 'self'; connect-src ${
        process.env.VUE_APP_API_URL
      } sentry.io; img-src data: 'self' a.tile.openstreetmap.org b.tile.openstreetmap.org c.tile.openstreetmap.org  a.tile.openstreetmap.fr b.tile.openstreetmap.fr c.tile.openstreetmap.fr geoservices.brgm.fr wxs.ign.fr stats.data.gouv.fr; frame-src app.mailjet.com;`,
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'X-XSS-Protection': '1; mode=block',
      'Access-Control-Allow-Origin': '*'
    })
  }
})
const port = process.env.NODE_PORT

app.use(compression())
app.use(staticFileMiddleware)
app.use(history())
app.use(staticFileMiddleware)

app.get('/', (req, res) => {
  const p = path.join(__dirname, '/dist/index.html')
  res.render(p)
})

app.listen(port, () => {
  console.log(`Server: ${port}`)
})
