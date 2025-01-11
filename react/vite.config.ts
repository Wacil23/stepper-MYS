import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../extensions/multi-step/assets',
    rollupOptions: {
      input: {
        stepper: resolve(__dirname, 'src/main.tsx')
      },
      output: {
        format: 'iife',
        entryFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
      },
    }
  }
})
