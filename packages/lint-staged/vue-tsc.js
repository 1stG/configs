const { tsConfig } = require('./_utils')

module.exports = {
  ...require('./base'),
  '*.{vue,ts,tsx}': () => `vue-tsc -p ${tsConfig} --noEmit --incremental false`,
}
