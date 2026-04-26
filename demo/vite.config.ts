import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig(() => {
  const pkgSrc = resolve(__dirname, '../packages/enketo-webform/src');
  
  return {
    resolve: {
      alias: {
        '@picsa/enketo-webform': resolve(pkgSrc, 'enketo-webform.ts'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
  };
});