module.exports = {
  ...require('./base'),
  parser: {
    '.svelte$': '@markuplint/svelte-parser',
  },
}
