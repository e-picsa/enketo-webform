import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  plugins: [
    preact({
      // Tell Preact's Babel transform to ignore the parent src directory.
      // The regex handles both Windows (\) and Unix (/) file paths.
      exclude: [/[/\\]src[/\\]/],
    }),
  ],
  resolve: {
    alias: {
      "@picsa/enketo-webform/types": resolve(__dirname, "../types"),
      "@picsa/enketo-webform": resolve(__dirname, "../src/index.ts"),
    },
  },
  optimizeDeps: {
    // Prevent Vite from trying to pre-bundle the local aliased file
    exclude: ["@picsa/enketo-webform"],
  },
  server: {
    fs: {
      // Required so Vite can serve the raw .ts file from the parent workspace
      allow: [".."],
    },
  },
});
