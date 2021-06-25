module.exports = {
  ...require('./base'),
  parser: {
    '.vue$': '@markuplint/vue-parser',
  },
  specs: ['@markuplint/vue-spec'],
}
