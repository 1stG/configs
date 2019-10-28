const { isPkgAvailable, tryFile } = require('@pkgr/utils')

const config = Object.assign({}, require('./base'))

const eslint = isPkgAvailable('eslint')

const tslint = isPkgAvailable('tslint') && tryFile('tslint.json')

if (eslint && tslint) {
  Object.assign(config, require('./ts-eslint'), require('./ts-tslint'))
} else if (eslint) {
  Object.assign(config, require('./ts-eslint'))
} else if (tslint) {
  Object.assign(config, require('./ts-tslint'))
}

module.exports = config
