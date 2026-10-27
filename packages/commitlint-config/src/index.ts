import { createRequire } from 'node:module'

import conventionalConfig from '@commitlint/config-conventional'
import type { UserConfig } from '@commitlint/types'
import { isMonorepo } from '@pkgr/utils'

export type * from '../shim.js'

const workspaceScopesModule = createRequire(import.meta.url)(
  '@commitlint/config-workspace-scopes',
) as UserConfig & { default?: UserConfig }

export interface CommitlintConfigOptions extends UserConfig {
  /** Also validate scopes against the workspace package names. @default isMonorepo() */
  monorepo?: boolean
}

export const defineConfig = ({
  monorepo = isMonorepo(),
  ...options
}: CommitlintConfigOptions = {}): UserConfig => {
  const conventional: UserConfig = {
    ...conventionalConfig,
    ...options,
    rules: {
      ...conventionalConfig.rules,
      ...options.rules,
    },
  }

  if (!monorepo) {
    return conventional
  }

  const workspaceScopes: UserConfig =
    workspaceScopesModule.default ?? workspaceScopesModule

  return {
    ...conventional,
    rules: {
      ...conventional.rules,
      ...workspaceScopes.rules,
    },
    utils: {
      ...conventional.utils,
      ...workspaceScopes.utils,
    },
  }
}

export default defineConfig()
