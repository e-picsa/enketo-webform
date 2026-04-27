import { jsxTypesPlugin } from "@wc-toolkit/jsx-types";
import { customElementsManifestToMarkdown } from "@custom-elements-manifest/to-markdown";
import { writeFileSync } from "fs";

const fixModulePathsPlugin = () => ({
  name: "fix-module-paths",
  packageLinkPhase({ customElementsManifest }) {
    // Strip the workspace prefix from all module paths in the manifest.
    // This is needed because the analyzer runs from the monorepo root,
    // but the package expects paths relative to its own directory.
    // Additionally fixes export declaration modules, which are used by jsxTypesPlugin
    // to generate import paths in the generated .d.ts files.
    const prefix = "packages/enketo-webform/";

    for (const mod of customElementsManifest.modules ?? []) {
      // Fix module path (e.g., "packages/enketo-webform/src/foo.ts" -> "src/foo.ts")
      if (mod.path?.startsWith(prefix)) {
        mod.path = mod.path.slice(prefix.length);
      }

      // Fix declaration paths in module declarations
      // These are used by jsxTypesPlugin to generate import paths in the types files
      for (const decl of mod.declarations ?? []) {
        if (decl.modulePath?.startsWith(prefix)) {
          let modPath = decl.modulePath.slice(prefix.length);
          if (!modPath.startsWith("../")) {
            modPath = "../" + modPath;
          }
          decl.modulePath = modPath;
        }
        if (decl.definitionPath?.startsWith(prefix)) {
          let defPath = decl.definitionPath.slice(prefix.length);
          if (!defPath.startsWith("../")) {
            defPath = "../" + defPath;
          }
          decl.definitionPath = defPath;
        }
      }

      // Fix export declaration module reference.
      // This is critical for jsxTypesPlugin - it uses this to generate the import statement
      // in react.d.ts/preact.d.ts (e.g., `import type { EnketoWebform } from "src/enketo-webform.ts"`).
      //
      // jsxTypesPlugin outputs files to a `types/` subdirectory, so relative imports
      // need `../` prefix. For example, if export module is `src/enketo-webform.ts`,
      // the generated import should be `from "../src/enketo-webform.ts"` because
      // the types are generated in `packages/enketo-webform/types/` while
      // the source is in `packages/enketo-webform/src/`.
      for (const exp of mod.exports ?? []) {
        const modulePath = exp.declaration?.module;
        if (modulePath) {
          if (modulePath.startsWith(prefix)) {
            exp.declaration.module = modulePath.slice(prefix.length);
          }
          if (
            exp.declaration.module &&
            !exp.declaration.module.startsWith("../")
          ) {
            exp.declaration.module = "../" + exp.declaration.module;
          }
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
    writeFileSync("./docs/api.md", md);
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
      // jsxTypesPlugin outputs types to a `types/` subdirectory, so prepend "../" to make
      // paths relative to the package root. This ensures imports like `from "src/foo.ts"`
      // become `from "../src/foo.ts"` in the generated type files.
      componentTypePath: (name, tag, modulePath) => {
        if (modulePath?.startsWith("src/")) {
          return "../" + modulePath;
        }
        return modulePath;
      },
    }),
    jsxTypesPlugin({
      outdir: "./packages/enketo-webform/types",
      fileName: "react.d.ts",
      module: "react",
      componentTypePath: (name, tag, modulePath) => {
        if (modulePath?.startsWith("src/")) {
          return "../" + modulePath;
        }
        return modulePath;
      },
    }),
    toMarkdownPlugin(),
  ],
};
