import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  {files: ["src/**/*.ts"], languageOptions: {sourceType: "commonjs"}},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
      "ecmaVersion": "latest",
      "sourceType": "module"
    },
    "plugins": ["@typescript-eslint"],
    "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
    "rules": {
      "semicolon": [2, "always"],
      "no-console": 0,
      "max-classes-per-file": [2, 1],
      "no-redundant-jsdoc": 2,
      "no-eval": 0,
      "no-string-literal": 2,
      "no-namespace": 2,
      "no-angle-bracket-type-assertion": 0
    },
    "env": {
      "es6": true
    },
  }
];