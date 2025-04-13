import base from './base.js'

/**
 * @type {Config}
 * @import {Config} from '@markuplint/core'
 */
const vue = {
  ...base,
  parser: {
    '.vue$': '@markuplint/vue-parser',
  },
  specs: ['@markuplint/vue-spec'],
}

export default vue
