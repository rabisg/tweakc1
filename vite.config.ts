import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === 'UNRESOLVED_IMPORT' && warning.id?.includes('mermaid')) {
          return;
        }
        warn(warning);
      },
    },
  },
  optimizeDeps: {
    include: ['d3-sankey'],
  },
})
