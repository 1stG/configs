const { tsConfig, typeCoverage } = require('./_utils')

module.exports = {
  ...require('./base'),
  '*.ts?(x)': () =>
    [`tsc -p ${tsConfig} --noEmit`, typeCoverage].filter(Boolean),
}
