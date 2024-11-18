import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  envDir: './',   
  plugins: [react()],
  server: {
    open: true,
  },
  build: {
    rollupOptions: {
      input: 'index.html',
    },
  },
});
