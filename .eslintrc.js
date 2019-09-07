const { overrides } = require('@1stg/eslint-config/overrides')

module.exports = {
  extends: '@1stg',
  overrides,
  settings: {
    polyfills: [
      'console',
      'Array.isArray',
      'Object.assign',
      'Object.keys',
      'Promise',
    ],
  },
  rules: {
    'node/no-extraneous-import': 0,
    'node/no-extraneous-require': 0,
  },
}
