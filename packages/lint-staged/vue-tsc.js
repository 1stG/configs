const { tsconfig, typeCoverage } = require('./_utils')

module.exports = {
  ...require('./base'),
  '*.{vue,ts,tsx}': () =>
    [
      `vue-tsc -p ${tsconfig} --noEmit --incremental false`,
      typeCoverage,
    ].filter(Boolean),
}
