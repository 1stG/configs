import type { Config } from '@markuplint/ml-config'

export interface MarkuplintConfigOptions {
  /** Add the Vue parser and spec. @default false */
  vue?: boolean
}

export declare const defineConfig: (options?: MarkuplintConfigOptions) => Config

declare const config: Config

export default config
