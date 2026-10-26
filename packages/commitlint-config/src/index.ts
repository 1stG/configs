import conventionalConfig from '@commitlint/config-conventional'
import workspaceScopesConfig from '@commitlint/config-workspace-scopes'
import type { UserConfig } from '@commitlint/types'
import { isMonorepo } from '@pkgr/utils'

/// <reference path="./types.d.ts" />

declare module '@commitlint/types' {
  interface UserConfig {
    utils?: Record<string, unknown>
  }
}

export interface CommitlintConfig extends UserConfig {
  utils?: Record<string, unknown>
}

export interface CommitlintConfigOptions extends UserConfig {
  /** Also validate scopes against the workspace package names. @default isMonorepo() */
  monorepo?: boolean
}

export const defineConfig = ({
  monorepo = isMonorepo(),
  ...options
}: CommitlintConfigOptions = {}): CommitlintConfig => {
  const conventional: CommitlintConfig = {
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
