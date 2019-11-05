const baseConfig = require('.')

module.exports = Object.assign({}, baseConfig, {
  rules: Object.assign({}, baseConfig.rules, {
    'scss/declaration-nested-properties': null,
    'scss/dollar-variable-default': null,
    'scss/media-feature-value-dollar-variable': null,
    'scss/selector-nest-combinators': null,
  }),
})
