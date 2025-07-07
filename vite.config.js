import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path'; // ✅ Tambahkan baris ini

export default defineConfig({
  plugins: [react()],
  base: '/', // Ganti sesuai nama repo GitHub kamu
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
});
