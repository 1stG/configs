import base from './base.js'

/**
 * @type {Config}
 * @import {Config} from 'stylelint'
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
