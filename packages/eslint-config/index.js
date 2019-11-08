const { overrides } = require('./overrides')

module.exports = {
  extends: require.resolve('./base'),
  overrides,
}
