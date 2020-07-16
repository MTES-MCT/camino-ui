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
    proxy: { '/api': { target: process.env.API_URL } }
  },
  transpileDependencies: [
    'apollo-cache-inmemory',
    'apollo-client',
    'apollo-link',
    'apollo-link-context',
    'apollo-link-error',
    'apollo-link-http',
    'apollo-utilities',
    'graphql',
    'graphql-tag',
    'vuex',
    'unfetch'
  ]
}
