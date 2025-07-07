
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/loker-bima/', // Ganti dengan nama repositori GitHub kamu
});
