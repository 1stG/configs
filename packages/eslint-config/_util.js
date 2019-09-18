const fs = require('fs')
const path = require('path')

exports.identity = _ => _

exports.isMonorepo =
  fs.existsSync(path.resolve('lerna.json')) ||
  !!require(path.resolve('package.json')).workspaces

try {
  const pkgs = path.resolve('packages')
  exports.allowModules =
    exports.isMonorepo &&
    fs
      .readdirSync(pkgs)
      .map(pkg => require(path.resolve(pkgs, pkg, 'package.json')).name)
} catch (e) {}

try {
  exports.isSrcDirAvailable = fs.statSync(path.resolve('src')).isDirectory()
} catch (e) {}

try {
  exports.isSrcAppDirAvailable = fs
    .statSync(path.resolve('src/app'))
    .isDirectory()
} catch (e) {}

try {
  // eslint-disable-next-line node/no-extraneous-require
  require.resolve('@angular/core')
  exports.isNgAvailable = true
} catch (e) {}

try {
  // eslint-disable-next-line node/no-extraneous-require
  require.resolve('webpack')
  exports.isWebpackAvailable = true
} catch (e) {}

// https://webpack.js.org/api/module-variables/#__resourcequery-webpack-specific
exports.webpackSpecVars = [
  '__resourceQuery',
  '__non_webpack_require__',
  '__webpack_chunk_load__',
  '__webpack_hash__',
  '__webpack_modules__',
  '__webpack_public_path__',
  '__webpack_require__',
  'DEBUG',
]

exports.magicNumbers = [-1, 0, 1, 2, 7, 12, 24, 60, 500, 1000]
