import { getScriptRunner, isPkgAvailable } from '@pkgr/utils'

export interface GitHooksOptions {
  /** Script runner used in the hook commands. */
  runner?: string
}

export type GitHooks = Record<string, string>

export const defineConfig = ({
  runner = getScriptRunner() || 'npx',
}: GitHooksOptions = {}): GitHooks => {
  const hooks: GitHooks = {}

  if (isPkgAvailable('nano-staged')) {
    hooks['pre-commit'] = `${runner} nano-staged`
  }

  if (isPkgAvailable('@commitlint/cli')) {
    hooks['commit-msg'] = `${runner} commitlint -e`
  }

  return hooks
}

export default defineConfig()
