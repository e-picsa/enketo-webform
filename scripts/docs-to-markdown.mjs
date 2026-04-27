import fs from "fs";
import { customElementsManifestToMarkdown } from "@custom-elements-manifest/to-markdown";

const manifest = JSON.parse(
  fs.readFileSync("./docs/custom-elements.json", "utf-8"),
);
const markdown = customElementsManifestToMarkdown(manifest, {
  headingOffset: 1,
});

fs.writeFileSync("./docs/api.md", markdown);
// eslint-disable-next-line no-undef
console.log("Generated docs/api.md");
