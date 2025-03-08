import base from './base.js'

/**
 * @import {Config} from 'stylelint'
 * @type {Config}
 */
const loose = {
  ...base,
  rules: {
    ...base.rules,
    'scss/declaration-nested-properties': null,
    'scss/dollar-variable-default': null,
    'scss/media-feature-value-dollar-variable': null,
    'scss/selector-nest-combinators': null,
  },
}

export default loose
