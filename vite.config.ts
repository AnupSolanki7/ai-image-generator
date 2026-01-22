import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // vite.config.ts
    proxy: {
      '/hf-api': {
        target: 'https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-3.5-large',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/hf-api/, ''),
      },
    }
  },
})