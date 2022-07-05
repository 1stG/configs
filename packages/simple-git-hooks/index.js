const { getScriptRunner } = require('@pkgr/utils')

const runner = getScriptRunner() || 'npx'

module.exports = {
  'pre-commit': `${runner} lint-staged`,
  'commit-msg': `${runner} commitlint -e`,
}
