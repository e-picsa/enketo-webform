import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  plugins: [
    preact({
      // Only include the demo's own source files for Preact transformation.
      include: ["src/**"],
    }),
    // Custom plugin to force a full reload when the library source changes.
    // This avoids "already registered" errors with web components in HMR.
    {
      name: "full-reload-lib",
      handleHotUpdate({ file, server }) {
        if (file.includes("/src/") && !file.includes("/demo/")) {
          server.ws.send({ type: "full-reload" });
          return [];
        }
      },
    },
  ],
  resolve: {
    alias: {
      "@picsa/enketo-webform/types": resolve(__dirname, "../types"),
      "@picsa/enketo-webform": resolve(__dirname, "../src/index.ts"),
    },
  },
  optimizeDeps: {
    exclude: ["@picsa/enketo-webform"],
  },
  server: {
    fs: {
      // Required so Vite can serve the raw .ts file from the parent workspace
      allow: [".."],
    },
  },
});
