const { tsconfig, typeCoverage } = require('./_utils')

module.exports = {
  ...require('./base'),
  '*.{html,ts}': () => `ngc -p ${tsconfig} --noEmit`,
  '*.ts?(x)': () => [typeCoverage].filter(Boolean),
}
