const fs = require('fs')
const { resolve } = require('path')

const { isPkgAvailable, tryFile } = require('@pkgr/utils')
const isGlob = require('is-glob')
const globSync = require('tiny-glob/sync')

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
            : tryFile(resolve(pkg)),
        )
        .filter(Boolean),
    [],
  )

  exports.allowModules = pkgs.reduce((acc, pkg) => {
    const pkgJson = resolve(pkg, 'package.json')
    if (!fs.existsSync(pkgJson)) {
      return acc
    }
    const { name, peerDependencies = {}, dependencies = {} } = require(pkgJson)
    return acc.concat(
      name,
      Object.keys(peerDependencies),
      Object.keys(dependencies),
    )
  }, [])
}

try {
  exports.isSrcDirAvailable = fs.statSync(resolve('src')).isDirectory()
} catch (e) {}

exports.isWebpackAvailable = isPkgAvailable('webpack')

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

exports.camelCaseRule = [
  2,
  {
    properties: 'never',
    ignoreDestructuring: true,
    allow: exports.isWebpackAvailable ? exports.webpackSpecVars : undefined,
  },
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
  768,
  1000,
  1024,
  3600,
  8080,
]
