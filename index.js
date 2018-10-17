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
const staticFileMiddleware = express.static(path.join(__dirname, 'dist'))
const port = process.env.NODE_PORT

app.use(compression())
app.use(staticFileMiddleware)
app.use(history())
app.use(staticFileMiddleware)

app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', 'default-src: https:')
  res.setHeader('X-Frame-Options', 'DENY')
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-XSS-Protection', '1; mode=block')
  next()
})

app.get('/', (req, res) => {
  res.render(path.join(__dirname + '/dist/index.html'))
})

app.listen(port, () => {
  console.log(`Server: ${port}`)
})
