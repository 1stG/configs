let isLernaAvailable

try {
  // eslint-disable-next-line node/no-extraneous-require
  require.resolve('lerna')
  isLernaAvailable = true
} catch (e) {}

module.exports = isLernaAvailable
  ? require('lodash.merge')(
      require('@commitlint/config-conventional'),
      require('@commitlint/config-lerna-scopes'),
    )
  : require('@commitlint/config-conventional')
