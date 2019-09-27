const path = require('path')

const config = Object.assign({}, require('./base'))

let eslint = false

try {
  require.resolve('eslint')
  eslint = true
} catch (e) {}

let tslint

try {
  require.resolve(path.resolve('tslint.json'))
  tslint = true
} catch (e) {}

if (eslint && tslint) {
  Object.assign(config, require('./ts-eslint'), require('./ts-tslint'))
} else if (eslint) {
  Object.assign(config, require('./ts-eslint'))
} else if (tslint) {
  Object.assign(config, require('./ts-tslint'))
}

module.exports = config
