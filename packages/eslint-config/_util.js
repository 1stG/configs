const fs = require('fs')
const path = require('path')

exports.identity = _ => _

let pkg = {}

try {
  pkg = require(path.resolve('package.json'))
} catch (e) {}

exports.isMonorepo =
  fs.existsSync(path.resolve('lerna.json')) || !!pkg.workspaces

try {
  const pkgs = path.resolve('packages')
  exports.allowModules =
    exports.isMonorepo &&
    fs.readdirSync(pkgs).reduce((acc, pkg) => {
      const pkgJson = path.resolve(pkgs, pkg, 'package.json')
      return fs.existsSync(pkgJson) ? acc.concat(require(pkgJson).name) : acc
    }, [])
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

try {
  // eslint-disable-next-line node/no-extraneous-require
  require.resolve('browserslist')
  exports.isBrowserslistEnabled = pkg.devDependencies.browserslist
} catch (e) {}

exports.magicNumbers = [
  -1,
  0,
  1,
  2,
  5,
  7,
  10,
  12,
  15,
  20,
  24,
  30,
  50,
  60,
  100,
  365,
  500,
  1000,
  3600,
]
