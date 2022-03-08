module.exports = {
  plugins: ['graphql-tag', '@vue/babel-plugin-jsx'],
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
