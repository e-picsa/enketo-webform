import { jsxTypesPlugin } from "@wc-toolkit/jsx-types";
import { customElementsManifestToMarkdown } from "@custom-elements-manifest/to-markdown";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const PACKAGE_PREFIX = "packages/enketo-webform/";
const TYPES_OUTDIR = "./packages/enketo-webform/types";

const stripPrefix = (p) =>
  p?.startsWith(PACKAGE_PREFIX) ? p.slice(PACKAGE_PREFIX.length) : p;

const relativize = (p) =>
  p && !p.startsWith("../") && !p.startsWith("/") ? "../" + p : p;

// Strips the monorepo prefix from manifest paths and relativizes declaration/export
// paths so jsxTypesPlugin emits correct imports from the `types/` subdirectory.
const fixModulePathsPlugin = () => ({
  name: "fix-module-paths",
  packageLinkPhase({ customElementsManifest }) {
    for (const mod of customElementsManifest.modules ?? []) {
      mod.path = stripPrefix(mod.path);

      for (const decl of mod.declarations ?? []) {
        decl.modulePath = relativize(stripPrefix(decl.modulePath));
        decl.definitionPath = relativize(stripPrefix(decl.definitionPath));
      }

      for (const exp of mod.exports ?? []) {
        if (exp.declaration?.module) {
          exp.declaration.module = relativize(
            stripPrefix(exp.declaration.module),
          );
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
    const out = "./docs/api.md";
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, md);
  },
});

export default {
  outdir: "./packages/enketo-webform",
  globs: ["packages/enketo-webform/src/**/*.ts"],
  litelement: true,
  plugins: [
    fixModulePathsPlugin(),
    jsxTypesPlugin({
      outdir: TYPES_OUTDIR,
      fileName: "preact.d.ts",
      module: "preact",
    }),
    jsxTypesPlugin({
      outdir: TYPES_OUTDIR,
      fileName: "react.d.ts",
      module: "react",
    }),
    toMarkdownPlugin(),
  ],
};
