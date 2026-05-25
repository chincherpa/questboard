import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import pkg from './package.json'

export default defineConfig({
  plugins: [react()],
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5050',
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
