const { getGlobals } = require('eslint-plugin-mdx')

const {
  allowModules,
  camelCaseRule,
  isWebpackAvailable,
  magicNumbers,
  webpackSpecVars,
} = require('./_util')

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:node/recommended',
    'plugin:promise/recommended',
    'plugin:sonarjs/recommended',
    'plugin:unicorn/recommended',
    'standard',
    'plugin:prettier/recommended',
    'prettier/standard',
  ],
  settings: {
    node: {
      allowModules,
      tryExtensions: [
        '.ts',
        '.tsx',
        '.vue',
        '.mjs',
        '.js',
        '.jsx',
        '.json',
        '.node',
        '.mdx',
      ],
    },
  },
  globals: isWebpackAvailable ? getGlobals(webpackSpecVars) : undefined,
  rules: {
    camelcase: camelCaseRule,
    'import/order': [
      2,
      {
        'newlines-between': 'always',
      },
    ],
    'no-empty': [
      2,
      {
        allowEmptyCatch: true,
      },
    ],
    'no-empty-function': 2,
    'no-magic-numbers': [
      2,
      {
        enforceConst: true,
        ignore: magicNumbers,
        ignoreArrayIndexes: true,
      },
    ],
    'node/no-unsupported-features/es-syntax': 0,
    'node/no-unsupported-features/node-builtins': 0,
    'node/no-unpublished-import': 0,
    'node/no-unpublished-require': 0,
    'prefer-const': 2,
    'unicorn/filename-case': [
      2,
      {
        cases: {
          kebabCase: true,
          pascalCase: true,
        },
        ignore: ['README.md'],
      },
    ],
    'unicorn/prevent-abbreviations': 0,
    'unicorn/no-nested-ternary': 0,
    'unicorn/number-literal-case': 0,
  },
}
