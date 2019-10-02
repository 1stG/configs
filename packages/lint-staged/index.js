const path = require('path')

const config = Object.assign({}, require('./base'))

let eslint = false

try {
  eslint = !!require.resolve('eslint')
} catch (e) {}

let tslint

try {
  tslint = !!require.resolve(path.resolve('tslint.json'))
} catch (e) {}

if (eslint && tslint) {
  Object.assign(config, require('./ts-eslint'), require('./ts-tslint'))
} else if (eslint) {
  Object.assign(config, require('./ts-eslint'))
} else if (tslint) {
  Object.assign(config, require('./ts-tslint'))
}

module.exports = config
