import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',
  server: { port: 5173, strictPort: true, watch: { usePolling: true } },
  preview: { port: 4173, strictPort: true },
  build: { outDir: 'dist', sourcemap: true, license: { fileName: 'dependency-licenses.txt' } },
});
