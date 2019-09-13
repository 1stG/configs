const fs = require('fs')
const path = require('path')

exports.identity = function(_) {
  return _
}

exports.isMonorepo =
  fs.existsSync(path.resolve('lerna.json')) ||
  !!require(path.resolve('package.json')).workspaces

exports.allowModules = exports.isMonorepo
  ? fs.statSync('packages').isDirectory() &&
    fs
      .readdirSync('packages')
      .map(pkg => require(path.resolve(`packages/${pkg}/package.json`)).name)
  : undefined
