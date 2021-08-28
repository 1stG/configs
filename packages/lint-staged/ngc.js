const { tsConfig, typeCoverage } = require('./_utils')

module.exports = {
  ...require('./base'),
  '*.{html,ts}': () => `ngc -p ${tsConfig} --noEmit`,
  '*.ts?(x)': () => [typeCoverage].filter(Boolean),
}
