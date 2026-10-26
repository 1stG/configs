// oxlint-disable-next-line typescript/triple-slash-reference
/// <reference path="../shim.d.ts" />

import conventionalConfig from '@commitlint/config-conventional'
import workspaceScopesConfig from '@commitlint/config-workspace-scopes'
import type { UserConfig } from '@commitlint/types'
import { isMonorepo } from '@pkgr/utils'

declare module '@commitlint/types' {
  interface UserConfig {
    utils?: Record<string, unknown>
  }
}

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

  const workspaceScopes: UserConfig = workspaceScopesConfig

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
