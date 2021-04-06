import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import npmPackage from './package.json'
require('dotenv').config()

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
  },
  server: {
    proxy: {
      '/apiUrl': {
        target: process.env.API_URL,
        changeOrigin: true,
        rewrite: path => path.replace(/^\/apiUrl/, '')
      }
    }
  }
})
