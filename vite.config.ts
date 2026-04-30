import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { resolve } from "path";

export default defineConfig({
  clearScreen: false,
  plugins: [
    dts({
      include: [
        "src/enketo-webform.ts",
        "src/kobo-service.ts",
        "src/utils.ts",
        "src/index.ts",
      ],
      exclude: ["src/**/*.test.ts", "src/libs"],
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
      },
    },
  },
  build: {
    target: "esnext",
    // avoid emptying as could be served by demo
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, "src/enketo-webform.ts"),
      name: "EnketoWebform",
      formats: ["es", "umd"],
      fileName: (format) =>
        `enketo-webform.${format === "es" ? "js" : "umd.cjs"}`,
    },
    rollupOptions: {
      output: {
        assetFileNames: "enketo-webform[extname]",
      },
    },
  },
  optimizeDeps: {
    include: ["jquery", "bootstrap-datepicker"],
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      html5sortable: resolve(
        __dirname,
        "node_modules/html5sortable/dist/html5sortable.es.js",
      ),
      "bootstrap-datepicker": resolve(
        __dirname,
        "node_modules/bootstrap-datepicker/dist/js/bootstrap-datepicker.js",
      ),
      signature_pad: resolve(
        __dirname,
        "node_modules/signature_pad/dist/signature_pad.js",
      ),
    },
  },
});
