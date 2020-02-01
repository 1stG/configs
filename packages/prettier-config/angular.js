const baseConfig = require('./base')

module.exports = Object.assign({}, baseConfig, {
  overrides: baseConfig.overrides.concat([
    {
      files: '*.html',
      options: {
        parser: 'angular',
      },
    },
  ]),
})
