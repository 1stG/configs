const fs = require('fs')
const path = require('path')

exports.identity = function(_) {
  return _
}

exports.isMonorepo =
  fs.existsSync(path.resolve('lerna.json')) ||
  !!require(path.resolve('package.json')).workspaces

const pkgs = path.resolve('packages')

exports.allowModules = exports.isMonorepo
  ? fs.existsSync(pkgs) &&
    fs.statSync(pkgs).isDirectory() &&
    fs
      .readdirSync(pkgs)
      .map(pkg => require(path.resolve(pkgs, pkg, 'package.json')).name)
  : undefined
