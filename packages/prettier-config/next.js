const baseConfig = require('./base')

module.exports = Object.assign({}, baseConfig, {
  overrides: baseConfig.overrides.concat([
    {
      files: '*.ts',
      options: {
        parser: 'babel-ts',
      },
    },
  ]),
})
