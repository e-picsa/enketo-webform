import { jsxTypesPlugin } from "@wc-toolkit/jsx-types";
import { customElementsManifestToMarkdown } from "@custom-elements-manifest/to-markdown";
import { writeFileSync } from "fs";

const fixModulePathsPlugin = () => ({
  name: "fix-module-paths",
  packageLinkPhase({ customElementsManifest }) {
    const prefix = "packages/enketo-webform/";
    for (const mod of customElementsManifest.modules ?? []) {
      if (mod.path?.startsWith(prefix)) {
        mod.path = mod.path.slice(prefix.length);
      }
      for (const decl of mod.declarations ?? []) {
        if (decl.modulePath?.startsWith(prefix)) {
          decl.modulePath = decl.modulePath.slice(prefix.length);
        }
        if (decl.definitionPath?.startsWith(prefix)) {
          decl.definitionPath = decl.definitionPath.slice(prefix.length);
        }
      }
      for (const exp of mod.exports ?? []) {
        if (exp.declaration?.module?.startsWith(prefix)) {
          exp.declaration.module = exp.declaration.module.slice(prefix.length);
        }
      }
    }
  },
});

const toMarkdownPlugin = () => ({
  name: "to-markdown",
  packageLinkPhase({ customElementsManifest }) {
    const md = customElementsManifestToMarkdown(customElementsManifest, {
      headingOffset: 1,
      classNameFilter: "^Enketo",
    });
    writeFileSync("../docs/api.md", md);
  },
});

export default {
  outdir: "./packages/enketo-webform",
  globs: ["packages/enketo-webform/src/**/*.ts"],
  litelement: true,
  plugins: [
    fixModulePathsPlugin(),
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