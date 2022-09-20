const { tsconfig, typeCoverage } = require('./_utils')

module.exports = {
  ...require('./base'),
  '*.ts?(x)': () =>
    [`tsc -p ${tsconfig} --noEmit`, typeCoverage].filter(Boolean),
}
