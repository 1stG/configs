const { allowModules } = require('@1stg/eslint-config/_util')

module.exports = {
  extends: '@1stg/eslint-config/recommended',
  settings: {
    node: {
      allowModules: allowModules.concat('tslint', 'typescript'),
    },
    polyfills: [
      'console',
      'Array.isArray',
      'JSON',
      'Object.assign',
      'Object.keys',
      'Promise',
    ],
  },
}
