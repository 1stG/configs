const base = require('./base.js')

/**
 * @import {Config} from '@markuplint/core'
 * @type {Config}
 */
const vue = {
  ...base,
  parser: {
    '.vue$': '@markuplint/vue-parser',
  },
  specs: ['@markuplint/vue-spec'],
}

module.exports = vue
