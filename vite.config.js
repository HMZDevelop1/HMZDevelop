import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
  build: {
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
          manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) return 'vendor'
          if (id.includes('node_modules/framer-motion')) return 'motion'
          if (id.includes('node_modules/gsap')) return 'gsap'
          if (id.includes('node_modules/three')) return 'three'
        }
      }
    }
  }
})
