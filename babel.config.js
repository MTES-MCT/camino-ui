module.exports = {
  plugins: ['graphql-tag'],
  env: {
    test: {
      plugins: ['babel-plugin-transform-vite-meta-env'],
      sourceType: 'module',
      presets: [
        ['@babel/preset-env', { targets: { node: 'current', esmodules: true } }]
      ]
    }
  }
}
