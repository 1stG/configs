const { allowModules } = require('./_util')

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:compat/recommended',
    'plugin:import/recommended',
    'plugin:node/recommended',
    'plugin:promise/recommended',
    'standard',
    'plugin:prettier/recommended',
    'prettier/standard',
  ],
  settings: {
    node: {
      allowModules,
    },
  },
  rules: {
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
    'node/no-unpublished-import': 0,
    'node/no-unpublished-require': 0,
    'prefer-const': 2,
  },
}
