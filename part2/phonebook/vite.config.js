import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://full-stack-open-exercises-2.onrender.com/',
        changeOrigin: true,
      }
    }
  }
})
