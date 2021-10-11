const conventionalConfig = require('@commitlint/config-conventional')
const lernaScopesConfig = require('@commitlint/config-lerna-scopes')
const { isPkgAvailable } = require('@pkgr/utils')

const MERGE_PROPERTIES = ['rules', 'utils']

module.exports = isPkgAvailable('lerna')
  ? {
      ...conventionalConfig,
      ...MERGE_PROPERTIES.reduce((config, property) => {
        config[property] = {
          ...conventionalConfig[property],
          ...lernaScopesConfig[property],
        }
        return config
      }, {}),
    }
  : conventionalConfig
