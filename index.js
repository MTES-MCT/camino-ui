require('dotenv').config()
const path = require('path')
const history = require('connect-history-api-fallback')
const express = require('express')
const app = express()
const staticFileMiddleware = express.static(path.join(__dirname, 'dist'))
const port = process.env.NODE_PORT

app.use(staticFileMiddleware)

app.use(history())

app.use(staticFileMiddleware)

app.get('/', function(req, res) {
  res.render(path.join(__dirname + '/dist/index.html'))
})

app.listen(port, () => {
  console.log(`Server: ${port}`)
})
