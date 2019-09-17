const { NODE_ENV = 'development' } = process.env

module.exports = (options = {}) => {
  const config = {
    plugins: [
      require('postcss-preset-env', options.presetEnv),
      require('postcss-import', options.import),
      require('postcss-normalize', options.normalize),
      require('postcss-url', options.url),
      require('autoprefixer'),
    ],
  }

  if ((options.env || NODE_ENV) === 'production') {
    config.plugins.push(
      require('cssnano', {
        preset: [
          options.advanced ? 'advanced' : 'default',
          {
            discardComments: {
              removeAll: true,
            },
          },
        ],
      }),
    )
  }

  return config
}
