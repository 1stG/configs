import type { Config } from '@markuplint/ml-config'

import { base } from './base.js'

export interface MarkuplintConfigOptions {
  /** Add the Vue parser and spec. @default false */
  vue?: boolean
}

/** @type {Config} */
const vueConfig: Config = {
  parser: { '.vue$': '@markuplint/vue-parser' },
  specs: { '.vue$': '@markuplint/vue-spec' },
}

export const defineConfig = ({
  vue = false,
}: MarkuplintConfigOptions = {}): Config =>
  vue
    ? {
        ...base,
        parser: { ...base.parser, ...vueConfig.parser },
        specs: { ...base.specs, ...vueConfig.specs },
      }
    : { ...base }

export default defineConfig()
