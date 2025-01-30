// eslint.config.js
const tseslint = require("@typescript-eslint/eslint-plugin");
const tsparser = require("@typescript-eslint/parser");

module.exports = [
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsparser,
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      "semi": ["error", "always"],
      "quotes": ["error", "double"],
      "@typescript-eslint/no-unused-vars": ["error"]
    }
  }
];
