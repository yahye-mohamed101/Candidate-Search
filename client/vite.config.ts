import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    host: '0.0.0.0', // Change to '0.0.0.0' if you need to expose it to your local network
    port: 3000, // Ensure this port is available
  },
  preview: {
    host: '0.0.0.0',
    port: 3000
  },
  
  plugins: [react()],
});
