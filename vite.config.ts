import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',
  // Do not scan pnpm's Windows cache through Docker's bind mount.
  optimizeDeps: { entries: ['index.html'] },
  server: {
    port: 5173,
    strictPort: true,
    watch: {
      usePolling: true,
      interval: 500,
      ignored: ['**/.pnpm-store/**', '**/dist/**', '**/.git/**', '**/artifacts/**'],
    },
  },
  preview: { port: 4173, strictPort: true },
  build: { outDir: 'dist', sourcemap: true, license: { fileName: 'dependency-licenses.txt' } },
});
