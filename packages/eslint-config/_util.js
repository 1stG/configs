const path = require('path')

const {
  isMonorepo,
  isPkgAvailable,
  monorepoPkgs,
  tryRequirePkg,
} = require('@pkgr/utils')

if (isMonorepo) {
  exports.allowModules = monorepoPkgs.reduce((acc, pkg) => {
    const pkgJson = tryRequirePkg(path.resolve(pkg, 'package.json'))
    if (!pkgJson) {
      return acc
    }
    const { name, peerDependencies = {}, dependencies = {} } = pkgJson
    // eslint-disable-next-line unicorn/prefer-spread
    return acc.concat(
      name,
      Object.keys(peerDependencies),
      Object.keys(dependencies),
    )
  }, [])
}

exports.isWebpackAvailable = isPkgAvailable('webpack')

// https://webpack.js.org/api/module-variables/#__resourcequery-webpack-specific
exports.webpackSpecVars = [
  '__non_webpack_require__',
  '__resourceQuery',
  '__webpack_chunk_load__',
  '__webpack_exports_info__',
  '__webpack_hash__',
  '__webpack_modules__',
  '__webpack_public_path__',
  '__webpack_require__',
  '__webpack_runtime_id__',
  'DEBUG',
]

exports.magicNumbers = [
  -1, 0, 1, 2, 3, 5, 7, 10, 12, 15, 20, 24, 30, 31, 50, 60, 100, 365, 366, 500,
  768, 1000, 1024, 3600, 4200, 8080,
]
