import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import npmPackage from './package.json'

const apiUrl = 'http://localhost:4000'

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
        target: apiUrl,
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
})
