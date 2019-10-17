let isLernaAvailable

try {
  // eslint-disable-next-line node/no-extraneous-require
  isLernaAvailable = !!require.resolve('lerna')
} catch (e) {}

const conventionalConfig = require('@commitlint/config-conventional')
const lernaScopesConfig = require('@commitlint/config-lerna-scopes')

// hard-coded for now
// TODO: check value types? but is that really necessary?
const MERGE_PROPERTIES = ['rules', 'utils']

module.exports = isLernaAvailable
  ? Object.assign(
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
