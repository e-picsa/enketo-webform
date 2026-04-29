import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

export default tseslint.config(
  // 1. Ignore build directories
  {
    ignores: [
      "**/dist",
      "**/node_modules",
      "**/*.d.ts",
      "docs/**",
      "*.md",
      "*.json",
      ".github",
    ],
  },

  // 2. Base JS and TS recommended rules
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // 3. Preact / TypeScript Setup
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
    },
    settings: {
      react: {
        pragma: "h", // Tells the plugin to use Preact's 'h' instead of React
        version: "16.0", // Tricks eslint-plugin-react into not warning about a missing React version
      },
    },
    rules: {
      // Pull in recommended rules
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,

      // Preact-specific overrides
      "react/react-in-jsx-scope": "off", // Not needed in Preact (or modern React)
      "react/prop-types": "off", // Rely on TypeScript interfaces instead
      "react/no-unknown-property": [
        "error",
        { ignore: ["class", "for"] }, // Preact uses standard HTML 'class' and 'for' attributes
      ],

      // Custom
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },

  // 4. Prettier (Must be last to override formatting rules from other configs)
  prettier,

  // 5. Legacy enketo libs
  {
    files: ["src/libs/**/*.{js,cjs,ts}"],
    rules: {
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-this-alias": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "no-undef": "off",
      "no-var": "off",
      "no-useless-assignment": "off",
      "prefer-const": "off",
      "prefer-rest-params": "off",
      "preserve-caught-error": "off",
    },
  },
);
