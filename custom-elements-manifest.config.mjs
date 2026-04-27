import { jsxTypesPlugin } from "@wc-toolkit/jsx-types";

export default {
  outdir: "docs",
  globs: ["packages/enketo-webform/src/**/*.ts"],
  litelement: true,
  plugins: [
    jsxTypesPlugin({
      outdir: "./packages/enketo-webform/types",
      fileName: "preact.d.ts",
      module: "preact",
    }),
    jsxTypesPlugin({
      outdir: "./packages/enketo-webform/types",
      fileName: "react.d.ts",
      module: "react", 
    }),
  ],
};