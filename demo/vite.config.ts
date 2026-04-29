import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  plugins: [preact()],
  resolve: {
    alias: {
      "@picsa/enketo-webform": resolve(__dirname, "../src/enketo-webform.ts"),
    },
  },
});
