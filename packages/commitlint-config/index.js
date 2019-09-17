let isLernaAvailable

try {
  // eslint-disable-next-line node/no-extraneous-require
  require.resolve('lerna')
  isLernaAvailable = true
} catch (e) {}

module.exports = isLernaAvailable
  ? require('@commitlint/config-lerna-scopes')
  : require('@commitlint/config-conventional')
