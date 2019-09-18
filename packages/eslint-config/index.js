const path = require('path')

const { getGlobals } = require('eslint-plugin-mdx')

const {
  allowModules,
  isSrcDirAvailable,
  isWebpackAvailable,
  webpackSpecVars,
} = require('./_util')

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
      resolvePaths: isSrcDirAvailable && [path.resolve('src')],
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
  globals: isWebpackAvailable && getGlobals(webpackSpecVars),
  rules: {
    camelcase: [
      2,
      {
        properties: 'never',
        ignoreDestructuring: true,
        allow: isWebpackAvailable && webpackSpecVars,
      },
    ],
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
