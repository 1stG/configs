const { tsConfig, typeCoverage } = require('./_utils')

module.exports = {
  ...require('./base'),
  '*.{vue,ts,tsx}': () =>
    [
      `vue-tsc -p ${tsConfig} --noEmit --incremental false`,
      typeCoverage,
    ].filter(Boolean),
}
