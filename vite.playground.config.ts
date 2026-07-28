import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: 'playground',
  base: '/',
  build: {
    outDir: '../dist-playground',
    emptyOutDir: true,
  },
  server: {
    port: 4444,
  },
  resolve: {
    alias: {
      '@g44/ui-kit': '/src/index.ts',
    },
  },
})
