import { getScriptRunner } from '@pkgr/utils'

const runner = getScriptRunner() || 'npx'

export default {
  'pre-commit': `${runner} nano-staged`,
  'commit-msg': `${runner} commitlint -e`,
}
