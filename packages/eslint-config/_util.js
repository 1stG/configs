/* eslint-disable node/no-extraneous-require */
const fs = require('fs')
const { resolve } = require('path')

const isGlob = require('is-glob')
const globSync = require('tiny-glob/sync')

exports.tryFile = filePath => (fs.existsSync(filePath) ? filePath : undefined)

let pkg = {}

try {
  pkg = require(resolve('package.json'))
} catch (e) {}

let lernaConfig

try {
  lernaConfig = require(resolve('lerna.json'))
} catch (e) {}

const pkgsPath = (lernaConfig && lernaConfig.packages) || pkg.workspaces

exports.isMonorepo = Array.isArray(pkgsPath)

if (exports.isMonorepo) {
  const pkgs = pkgsPath.reduce(
    (acc, pkg) =>
      acc
        .concat(
          isGlob(pkg)
            ? globSync(pkg).map(sub => resolve(sub))
            : exports.tryFile(resolve(pkg)),
        )
        .filter(Boolean),
    [],
  )

  try {
    exports.allowModules = pkgs.reduce((acc, pkg) => {
      const pkgJson = resolve(pkg, 'package.json')
      return fs.existsSync(pkgJson) ? acc.concat(require(pkgJson).name) : acc
    }, [])
  } catch (e) {}
}

try {
  exports.isSrcDirAvailable = fs.statSync(resolve('src')).isDirectory()
} catch (e) {}

try {
  exports.isSrcAppDirAvailable = fs.statSync(resolve('src/app')).isDirectory()
} catch (e) {}

try {
  exports.isNgAvailable = !!require.resolve('@angular/core')
} catch (e) {}

try {
  exports.isReactAvailable = !!require.resolve('react')
} catch (e) {}

try {
  exports.isVueAvailable = !!require.resolve('vue')
} catch (e) {}

try {
  exports.isWebpackAvailable = !!require.resolve('webpack')
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
  1024,
  3600,
]
