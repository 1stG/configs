// oxlint-disable-next-line typescript/triple-slash-reference
/// <reference path="./types.d.ts" />

import conventionalConfig from '@commitlint/config-conventional'
import workspaceScopesConfig from '@commitlint/config-workspace-scopes'
import type { UserConfig } from '@commitlint/types'
import { isMonorepo } from '@pkgr/utils'

declare module '@commitlint/types' {
  interface UserConfig {
    utils?: Record<string, unknown>
  }
}

export interface CommitlintConfig extends UserConfig {
  utils?: Record<string, unknown>
}

export interface CommitlintConfigOptions {
  /** Also validate scopes against the workspace package names. @default isMonorepo() */
  monorepo?: boolean
}

export const defineConfig = ({
  monorepo = isMonorepo(),
}: CommitlintConfigOptions = {}): CommitlintConfig => {
  const conventional: CommitlintConfig = conventionalConfig

  if (!monorepo) {
    return conventional
  }

  const workspaceScopes: CommitlintConfig = workspaceScopesConfig

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
