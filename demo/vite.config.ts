import { defineConfig } from 'vite';

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
  resolve: {
    alias: {
      '@picsa/enketo-webform': '../packages/enketo-webform/src/enketo-webform.ts',
    },
  },
});