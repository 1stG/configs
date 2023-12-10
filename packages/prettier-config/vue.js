import baseConfig from './base.js'

export default {
  ...baseConfig,
  overrides: [
    ...baseConfig.overrides,
    {
      files: '*.html',
      options: {
        parser: 'vue',
      },
    },
  ],
}
