import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslint from 'vite-plugin-eslint'
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    vue(),
    eslint({
      fix: true,
      throwOnError: true,
      throwOnWarning: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: '8080',
  },
  define: {
    'process.env': {},
  },
  build: {},
})
