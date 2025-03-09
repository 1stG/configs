import base from './base.js'

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

export default vue
