import { jsxTypesPlugin } from "@wc-toolkit/jsx-types";
import { customElementsManifestToMarkdown } from "@custom-elements-manifest/to-markdown";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const PACKAGE_PREFIX = "./";
const TYPES_OUTDIR = "./types";

const stripPrefix = (p) =>
  p?.startsWith(PACKAGE_PREFIX) ? p.slice(PACKAGE_PREFIX.length) : p;

// Used ONLY for type generation in the types/ folder
const relativize = (p) => {
  if (p === "src/enketo-webform.ts") return "../dist/enketo-webform.js";
  return p && !p.startsWith("../") && !p.startsWith("/") ? "../" + p : p;
};

// Surgical replacement plugin for type generation
const typeRelativizePlugin = () => ({
  name: "type-relativize",
  packageLinkPhase({ customElementsManifest }) {
    for (const mod of customElementsManifest.modules ?? []) {
      mod.path = relativize(stripPrefix(mod.path));
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
  outdir: "./",
  globs: ["src/**/*.ts"],
  litelement: true,
  plugins: [
    // 1. Generate types with relativized paths
    typeRelativizePlugin(),
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
    // 2. Restore EVERYTHING to root-relative paths for manifest and docs
    {
      name: "restore-root-paths",
      packageLinkPhase({ customElementsManifest }) {
        for (const mod of customElementsManifest.modules ?? []) {
          // Point back to sibling src/ without ../
          mod.path = stripPrefix(
            mod.path
              .replace("../dist/enketo-webform.js", "src/enketo-webform.ts")
              .replace("../", ""),
          );
          for (const decl of mod.declarations ?? []) {
            if (decl.modulePath)
              decl.modulePath = decl.modulePath
                .replace("../dist/enketo-webform.js", "src/enketo-webform.ts")
                .replace("../", "");
            if (decl.definitionPath)
              decl.definitionPath = decl.definitionPath
                .replace("../dist/enketo-webform.js", "src/enketo-webform.ts")
                .replace("../", "");
          }
          for (const exp of mod.exports ?? []) {
            if (exp.declaration?.module)
              exp.declaration.module = exp.declaration.module
                .replace("../dist/enketo-webform.js", "src/enketo-webform.ts")
                .replace("../", "");
          }
        }
      },
    },
    toMarkdownPlugin(),
  ],
};
