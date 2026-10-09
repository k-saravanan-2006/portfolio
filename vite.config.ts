import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: false,
    host: true
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          animation: ['gsap', 'lenis'],
          icons: ['lucide-react']
        }
      }
    }
  }
});
