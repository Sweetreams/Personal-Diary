import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/', // Должно быть '/'
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    // Добавьте это для корректной работы React Router
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  },
  server: {
    open: true,
    // Для корректной работы роутера в dev-режиме
    historyApiFallback: true
  }
})