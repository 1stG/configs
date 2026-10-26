// @ts-check

/**
 * @typedef {object} MarkuplintConfigOptions
 * @property {boolean} [vue=false] Add the Vue parser and spec.
 */

/** @import { Config } from '@markuplint/ml-config' */

import { base } from './base.js'

/** @type {Config} */
const vueConfig = {
  parser: { '.vue$': '@markuplint/vue-parser' },
  specs: ['@markuplint/vue-spec'],
}

/**
 * @param {MarkuplintConfigOptions} [options]
 * @returns {Config}
 */
export const defineConfig = ({ vue = false } = {}) =>
  vue
    ? {
        ...base,
        parser: { ...base.parser, ...vueConfig.parser },
        specs: [...(base.specs ?? []), ...vueConfig.specs],
      }
    : { ...base }

export default defineConfig()
