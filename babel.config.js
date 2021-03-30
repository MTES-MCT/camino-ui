module.exports = {
  plugins: ['graphql-tag'],
  env: {
    test: {
      sourceType: 'module',
      presets: [
        ['@babel/preset-env', { targets: { node: 'current', esmodules: true } }]
      ]
    }
  }
}
