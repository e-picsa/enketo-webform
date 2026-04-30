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
    {
      name: "force-web-component-reload",
      handleHotUpdate({ file, server }) {
        // Because of the Bun workspace symlink, Vite will resolve 'file'
        // to the absolute path of your root 'dist' folder when it rebuilds.
        if (file.includes("/dist/") && file.includes("enketo-webform")) {
          // 1. Send the hard-refresh command to the browser
          server.ws.send({ type: "full-reload" });

          // 2. Return an empty array to completely halt Vite's default HMR logic
          return [];
        }
      },
    },
  ],
  resolve: {
    alias: {
      "@picsa/enketo-webform/types": resolve(__dirname, "../types"),
      "@picsa/enketo-webform": resolve(__dirname, "../dist/enketo-webform.js"),
    },
  },
  optimizeDeps: {
    exclude: ["@picsa/enketo-webform"],
  },
});
