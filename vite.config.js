import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path')
const npmPackage = require('./package.json')

export default defineConfig({
  plugins: [vue()],
  root: 'src',
  server: {
    proxy: {
      '/apiUrl': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/apiUrl/, '')
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  define: {
    npmVersion: JSON.stringify(npmPackage.version)
  },
  build: {
    outDir: '../dist'
  }
})
