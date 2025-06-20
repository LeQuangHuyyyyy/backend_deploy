// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://34.96.206.251:8080', // backend chạy HTTP
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'), // giữ nguyên /api
      },
    },
  },
});
