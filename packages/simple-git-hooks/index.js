// @ts-check

/**
 * @typedef {object} GitHooksOptions
 * @property {string} [runner] Script runner used in the hook commands.
 */

/** @typedef {Record<string, string>} GitHooks */

import { getScriptRunner } from '@pkgr/utils'

/**
 * @param {GitHooksOptions} [options]
 * @returns {GitHooks}
 */
export const createHooks = ({ runner = getScriptRunner() || 'npx' } = {}) => ({
  'pre-commit': `${runner} nano-staged`,
  'commit-msg': `${runner} commitlint -e`,
})

export default createHooks()
