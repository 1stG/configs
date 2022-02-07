const base = require('./base')

module.exports = {
  ...base,
  rules: {
    ...base.rules,
    'scss/declaration-nested-properties': null,
    'scss/dollar-variable-default': null,
    'scss/media-feature-value-dollar-variable': null,
    'scss/selector-nest-combinators': null,
  },
}
