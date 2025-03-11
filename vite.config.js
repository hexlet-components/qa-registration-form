import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  cacheDir: '/var/tmp/.vite',
  plugins: [react()],
});
