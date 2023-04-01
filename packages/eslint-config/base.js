const { isTsAvailable } = require('@pkgr/utils')
const { getGlobals } = require('eslint-plugin-mdx')

const {
  isWebpackAvailable,
  magicNumbers,
  webpackSpecVars,
  prettierExtends,
} = require('./_util')

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@eslint-community/eslint-comments/recommended',
    'plugin:css/recommended',
    'plugin:import/recommended',
    'plugin:n/recommended',
    'plugin:promise/recommended',
    'plugin:regexp/recommended',
    'plugin:sonarjs/recommended',
    isTsAvailable && 'plugin:sonar/recommended',
    'plugin:unicorn/recommended',
    'standard',
    ...prettierExtends,
  ].filter(Boolean),
  plugins: ['es-x', 'simple-import-sort'],
  globals: isWebpackAvailable ? getGlobals(webpackSpecVars) : undefined,
  rules: {
    '@eslint-community/eslint-comments/disable-enable-pair': [
      2,
      {
        allowWholeFile: true,
      },
    ],
    '@eslint-community/eslint-comments/no-unused-disable': 2,
    'arrow-body-style': 2,
    camelcase: [
      2,
      {
        properties: 'never',
        ignoreDestructuring: true,
        allow: isWebpackAvailable ? webpackSpecVars : undefined,
      },
    ],
    curly: [2, 'all'],
    'import/first': 2,
    'import/newline-after-import': 2,
    'import/no-duplicates': 2,
    'import/order': [
      2,
      {
        alphabetize: {
          order: 'asc',
        },
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
    'no-labels': isTsAvailable ? 0 : 2, // sonar/no-labels
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

    // The following rules are duplicate with `eslint-plugin-import`
    'n/no-extraneous-import': 0,
    'n/no-extraneous-require': 0,
    'n/no-missing-import': 0,
    'n/no-missing-require': 0,

    'n/no-unsupported-features/es-syntax': 0,
    'n/no-unsupported-features/node-builtins': 0,
    'n/no-unpublished-import': 0,
    'n/no-unpublished-require': 0,
    'prefer-const': 2,
    'prefer-object-spread': 2,
    'simple-import-sort/exports': 2,
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
        // ignore UPPER_CASE markdown or yaml filenames
        ignore: [/^[A-Z](([\dA-Z]+_)*[\dA-Z]+)?\.(mdx?|ya?ml)$/],
      },
    ],
    'unicorn/no-array-reduce': 0,
    'unicorn/no-null': 0,
    'unicorn/no-unreadable-array-destructuring': 0, // conflict with `no-unused-vars`
    'unicorn/prefer-module': 0,
    'unicorn/prefer-object-from-entries': 0,
    'unicorn/prevent-abbreviations': 0,
  },
}
