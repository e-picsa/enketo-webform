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
      '@picsa/enketo-webform/styles': '../packages/enketo-webform/src/enketo-webform.scss',
      '@picsa/enketo-webform/styles/grid': '../packages/enketo-webform/src/libs/enketo/sass/grid/grid.scss',
      '@picsa/enketo-webform/styles/plain': '../packages/enketo-webform/src/libs/enketo/sass/plain/plain.scss',
      '@picsa/enketo-webform/styles/formhub': '../packages/enketo-webform/src/libs/enketo/sass/formhub/formhub.scss',
    },
  },
});