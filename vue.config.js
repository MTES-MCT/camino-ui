/* eslint-env node */
const path = require('path')
const webpack = require('webpack')
const npmPackage = require('./package.json')
const date = new Date().toISOString().slice(0, 10)

module.exports = {
  configureWebpack: {
    name: 'Camino UI',
    devtool: 'source-map',
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src')
      }
    },
    plugins: [
      new webpack.DefinePlugin({
        npmVersion: JSON.stringify(npmPackage.version),
        webpackDate: JSON.stringify(date)
      })
    ]
  },
  productionSourceMap: true,
  css: {
    sourceMap: true
  },
  devServer: {
    disableHostCheck: !!process.env.DEV_SERVER_DISABLE_HOST_CHECK || false,
    before(app) {
      app.get('/apiUrl', (req, res) => res.send(process.env.VITE_API_URL))
    }
  },
  transpileDependencies: [
    'graphql-react',
    'graphql',
    'graphql-tag',
    'vuex',
    'unfetch'
  ]
}
