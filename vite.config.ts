import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative base so the build works from any static host or sub-folder.
export default defineConfig({
  base: './',
  plugins: [react()],
});
