import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Fejlesztéskor az /api kéréseket a helyi backend (npm run dev:server) kapja
    proxy: { '/api': 'http://localhost:3001' },
  },
});
