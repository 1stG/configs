const fs = require('fs')

const { overrides } = require('@1stg/eslint-config/overrides')

module.exports = {
  extends: '@1stg',
  overrides,
  settings: {
    node: {
      allowModules: fs
        .readdirSync('packages')
        .map(pkg => `@1stg/${pkg}`)
        .concat('tslint', 'typescript'),
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
