import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    dts({
      include: [
        "src/enketo-webform.ts",
        "src/kobo-service.ts",
        "src/utils.ts",
        "src/types.d.ts",
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
    lib: {
      entry: resolve(__dirname, "src/enketo-webform.ts"),
      name: "EnketoWebform",
      formats: ["es", "umd"],
      fileName: (format) =>
        `enketo-webform.${format === "es" ? "js" : "umd.cjs"}`,
    },
    rollupOptions: {
      external(id) {
        if (id === "jquery" || id === "jquery-touchswipe") return false;
        if (id.includes("node_modules")) return true;
        return false;
      },
      output: {
        assetFileNames: "enketo-webform[extname]",
        globals: {
          jquery: "jQuery",
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
