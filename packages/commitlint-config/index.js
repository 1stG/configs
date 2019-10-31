const { isPkgAvailable } = require('@pkgr/utils')
const conventionalConfig = require('@commitlint/config-conventional')
const lernaScopesConfig = require('@commitlint/config-lerna-scopes')

const MERGE_PROPERTIES = ['rules', 'utils']

module.exports = isPkgAvailable('lerna')
  ? Object.assign(
      {},
      conventionalConfig,
      MERGE_PROPERTIES.reduce((config, property) => {
        config[property] = Object.assign(
          {},
          conventionalConfig[property],
          lernaScopesConfig[property],
        )
        return config
      }, {}),
    )
  : conventionalConfig
