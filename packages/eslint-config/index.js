const base = require('./base')
const { overrides } = require('./overrides')

module.exports = {
  ...base,
  overrides: [...base.overrides, ...overrides],
}
