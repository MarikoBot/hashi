// @ts-check

const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');

module.exports = tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  
  ...{"rules": {
    "semicolon": [2, "always"],
    "no-console": 0,
    "max-classes-per-file": [2, 1],
    "no-redundant-jsdoc": 2,
    "no-eval": 0,
    "no-string-literal": 2,
    "no-namespace": 2,
    "no-angle-bracket-type-assertion": 0
  }},
);