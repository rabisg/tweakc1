import { defineConfig } from 'vite'

export default defineConfig({
  base: '/tweakc1/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  },
})
