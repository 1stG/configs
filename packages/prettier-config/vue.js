const baseConfig = require('.')

module.exports = Object.assign({}, baseConfig, {
  overrides: baseConfig.overrides.concat([
    {
      files: '*.html',
      options: {
        parser: 'vue',
      },
    },
  ]),
})
