const base = require('./base.js')

module.exports = {
  ...base,
  parser: {
    '\\.html$': 'markuplint-angular-parser',
  },
}
