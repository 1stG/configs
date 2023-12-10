import baseConfig from './base.js'

export default {
  ...baseConfig,
  overrides: [
    ...baseConfig.overrides,
    {
      files: ['*.ts', '*.tsx'],
      options: {
        parser: 'babel-ts',
      },
    },
  ],
}
