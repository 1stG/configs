declare module '@commitlint/config-workspace-scopes' {
  import type { UserConfig } from '@commitlint/types'

  module '@commitlint/types' {
    interface UserConfig {
      utils?: Record<string, unknown>
    }
  }

  const config: UserConfig

  export default config
}
