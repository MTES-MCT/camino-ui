import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path')
const npmPackage = require('./package.json')

export default defineConfig({
  plugins: [vue()],
  root: 'src',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  define: {
    npmVersion: JSON.stringify(npmPackage.version)
  },
  build: {
    outDir: '../dist',
    chunkSizeWarningLimit: 550
  }
})
