const { overrides } = require('@1stg/eslint-config/overrides')

module.exports = {
  extends: '@1stg',
  overrides,
  rules: {
    'node/no-extraneous-require': 0,
    'node/no-extraneous-import': 0,
  },
}
