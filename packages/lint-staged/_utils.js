const path = require('path')

const { isPkgAvailable, tryFile, tryPkg } = require('@pkgr/utils')

exports.tsConfig = path.relative(
  process.cwd(),
  tryFile(path.resolve('tsconfig.staged.json')) ||
    tryFile(path.resolve('tsconfig.base.json')) ||
    tryFile(path.resolve('tsconfig.json')) ||
    tryPkg('@1stg/tsconfig'),
)

exports.typeCoverage =
  isPkgAvailable('type-coverage/bin/type-coverage') && 'type-coverage'
