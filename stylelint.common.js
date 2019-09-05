const config = require('@1stg/stylelint-config')

module.exports = {
  ...config,
  rules: {
    ...config.rules,
    'plugin/no-unsupported-browser-features': null,
  },
}
