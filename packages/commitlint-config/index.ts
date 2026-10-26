import conventionalConfig from '@commitlint/config-conventional'
import workspaceScopesConfig from '@commitlint/config-workspace-scopes'
import type { UserConfig } from '@commitlint/types'

const MERGE_PROPERTIES = ['rules', 'utils'] as const

export interface CommitlintConfigOptions {
  /** Also validate scopes against the workspace package names. @default false */
  monorepo?: boolean
}

export const defineConfig = ({
  monorepo = false,
}: CommitlintConfigOptions = {}): UserConfig => {
  if (!monorepo) {
    return conventionalConfig as UserConfig
  }

  const base = conventionalConfig as unknown as Record<string, unknown>
  const scopes = workspaceScopesConfig as unknown as Record<string, unknown>

  return MERGE_PROPERTIES.reduce<UserConfig>(
    (config, property) => ({
      ...config,
      [property]: {
        ...(base[property] as object),
        ...(scopes[property] as object),
      },
    }),
    { ...conventionalConfig } as UserConfig,
  )
}

export default defineConfig()
