import 'dotenv/config'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import path from 'path'
import npmPackage from './package.json'

export default defineConfig({
  plugins: [vue(), legacy()],
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
    outDir: '../dist'
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
