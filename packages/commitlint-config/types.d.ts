declare module '@commitlint/config-workspace-scopes' {
  import type { UserConfig } from '@commitlint/types'

  const config: {
    rules: Pick<NonNullable<UserConfig['rules']>, 'scope-enum'>
    utils: {
      getPackages(context?: { cwd?: string }): Promise<string[]>
    }
  }

  export default config
}
