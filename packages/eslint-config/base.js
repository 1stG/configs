const { getGlobals } = require('eslint-plugin-mdx')

const {
  allowModules,
  isWebpackAvailable,
  magicNumbers,
  webpackSpecVars,
} = require('./_util')

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:eslint-comments/recommended',
    'plugin:import/recommended',
    'plugin:node/recommended',
    'plugin:promise/recommended',
    'plugin:sonarjs/recommended',
    'plugin:unicorn/recommended',
    'standard',
    'plugin:prettier/recommended',
  ],
  plugins: ['sonar'],
  settings: {
    node: {
      allowModules,
      tryExtensions: [
        '.ts',
        '.tsx',
        '.vue',
        '.svelte',
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
    'arrow-body-style': 2,
    camelcase: [
      2,
      {
        properties: 'never',
        ignoreDestructuring: true,
        allow: isWebpackAvailable ? webpackSpecVars : undefined,
      },
    ],
    'eslint-comments/disable-enable-pair': [
      2,
      {
        allowWholeFile: true,
      },
    ],
    'eslint-comments/no-unused-disable': 2,
    'import/order': [
      2,
      {
        'newlines-between': 'always',
      },
    ],
    'no-else-return': [
      2,
      {
        allowElseIf: false,
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
    'no-negated-condition': 2,
    'no-process-exit': 0, // suspended by unicorn/no-process-exit
    'node/no-unsupported-features/es-syntax': 0,
    'node/no-unsupported-features/node-builtins': 0,
    'node/no-unpublished-import': 0,
    'node/no-unpublished-require': 0,
    'prefer-const': 2,
    'prefer-object-spread': 2,
    'sonar/deprecation': 1,
    'unicorn/catch-error-name': [
      2,
      {
        name: 'error',
        ignore: ['^e(rr)?$'],
      },
    ],
    'unicorn/consistent-function-scoping': 0,
    'unicorn/filename-case': [
      2,
      {
        cases: {
          kebabCase: true,
          pascalCase: true,
        },
        // ignore UPPER_CASE markdown filenames
        ignore: [/^[A-Z](([\dA-Z]+_)*[\dA-Z]+)?\.mdx?$/],
      },
    ],
    'unicorn/no-array-reduce': 0,
    'unicorn/no-null': 0,
    'unicorn/prevent-abbreviations': 0,
  },
}
