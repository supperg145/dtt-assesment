import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    port: 8080,
    open: true,
    proxy: {
      // Proxying requests that start with /api to the external API
      '/api': {
        target: 'https://api.intern.d-tt.nl', // Your API endpoint
        changeOrigin: true, // This will change the origin of the host header to the target URL
        rewrite: (path) => path.replace(/^\/api/, ''), // Rewrite the path, if necessary
      },
    },
  },
});
