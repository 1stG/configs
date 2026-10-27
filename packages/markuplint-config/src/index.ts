import type { Config } from '@markuplint/ml-config'
import { isPkgAvailable } from '@pkgr/utils'

import { base } from './base.js'

export interface MarkuplintConfigOptions extends Config {
  /** Add the Vue parser and spec. @default false */
  vue?: boolean
}

export const defineConfig = ({
  vue = isPkgAvailable('vue'),
  ...options
}: MarkuplintConfigOptions = {}): Config => {
  const config: Config = { ...base, ...options }

  if (!vue) {
    return config
  }

  return {
    ...config,
    parser: {
      ...config.parser,
      '.vue$': '@markuplint/vue-parser',
    },
    specs: {
      ...config.specs,
      '.vue$': '@markuplint/vue-spec',
    },
  }
}

export default defineConfig()
