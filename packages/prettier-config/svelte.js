const baseConfig = require('./base')

module.exports = {
  ...baseConfig,
  overrides: [
    ...baseConfig.overrides,
    {
      files: '*.html',
      options: {
        parser: 'svelte',
      },
    },
  ],
}
