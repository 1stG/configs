module.exports = {
  ...require('./base'),
  parser: {
    '\\.html$': 'markuplint-angular-parser',
  },
}
