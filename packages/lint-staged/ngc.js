const { tsConfig } = require('./_utils')

module.exports = {
  ...require('./base'),
  '*.{html,ts}': () => `ngc -p ${tsConfig} --noEmit`,
}
