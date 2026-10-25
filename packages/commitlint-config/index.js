// @ts-check

/**
 * @typedef {object} CommitlintConfigOptions
 * @property {boolean} [monorepo=false] Also validate scopes against the workspace package names.
 */

/** @import { UserConfig } from '@commitlint/types' */

import conventionalConfig from '@commitlint/config-conventional'
import workspaceScopesConfig from '@commitlint/config-workspace-scopes'

const MERGE_PROPERTIES = ['rules', 'utils']

/**
 * @param {CommitlintConfigOptions} [options]
 * @returns {UserConfig}
 */
export const createConfig = ({ monorepo = false } = {}) => {
  if (!monorepo) {
    return conventionalConfig
  }

  return MERGE_PROPERTIES.reduce(
    (config, property) => ({
      ...config,
      [property]: {
        ...conventionalConfig[property],
        ...workspaceScopesConfig[property],
      },
    }),
    /** @type {UserConfig} */ ({ ...conventionalConfig }),
  )
}

export default createConfig()
