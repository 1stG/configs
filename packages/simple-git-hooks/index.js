import { getScriptRunner } from '@pkgr/utils'

const runner = getScriptRunner() || 'npx'

export default {
  'pre-commit': `${runner} lint-staged`,
  'commit-msg': `${runner} commitlint -e`,
}
