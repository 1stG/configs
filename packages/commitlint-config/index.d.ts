import type { UserConfig } from '@commitlint/types'

export interface CommitlintConfigOptions {
  /** Also validate scopes against the workspace package names. @default false */
  monorepo?: boolean
}

export declare const createConfig: (
  options?: CommitlintConfigOptions,
) => UserConfig

declare const config: UserConfig

export default config
