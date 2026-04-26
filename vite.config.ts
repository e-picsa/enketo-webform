import { defineConfig } from 'vite';

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    cssMinify: true,
    rollupOptions: {
      external: ['jquery', /jquery-touchswipe/],
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});