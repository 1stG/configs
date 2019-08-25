const config = Object.assign({}, require('./base'))

let eslint = false

try {
  require.resolve('eslint')
  eslint = true
} catch (e) {}

let tslint = false

try {
  require.resolve('tslint')
  tslint = true
} catch (e) {}

if (eslint && tslint) {
  const key = '*.{ts,tsx}'
  Object.assign(config, {
    [key]: require('./ts-eslint')[key].concat(require('./ts-tslint')[key]),
  })
} else if (eslint) {
  Object.assign(config, require('./ts-eslint'))
} else if (tslint) {
  Object.assign(config, require('./ts-tslint'))
}

module.exports = config
