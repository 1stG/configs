import { getScriptRunner } from '@pkgr/utils'

export interface GitHooksOptions {
  /** Script runner used in the hook commands. */
  runner?: string
}

export type GitHooks = Record<string, string>

export const defineConfig = ({
  runner = getScriptRunner() || 'npx',
}: GitHooksOptions = {}): GitHooks => ({
  'pre-commit': `${runner} nano-staged`,
  'commit-msg': `${runner} commitlint -e`,
})

export default defineConfig()
