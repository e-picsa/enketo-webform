import { jsxTypesPlugin } from "@wc-toolkit/jsx-types";
import { customElementsManifestToMarkdown } from "@custom-elements-manifest/to-markdown";
import { writeFileSync } from "fs";

const toMarkdownPlugin = () => ({
  name: "to-markdown",
  packageLinkPhase({ customElementsManifest }) {
    const md = customElementsManifestToMarkdown(customElementsManifest, {
      headingOffset: 1,
      classNameFilter: "^Enketo",
    });
    writeFileSync("docs/api.md", md);
  },
});

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
    toMarkdownPlugin(),
  ],
};