const { NODE_ENV = 'development' } = process.env

module.exports = ({ env = NODE_ENV } = {}) => {
  const config = {
    plugins: [
      require('postcss-preset-env'),
      require('postcss-import'),
      require('postcss-normalize'),
      require('autoprefixer'),
    ],
  }

  if (env === 'production') {
    config.plugins.push(
      require('cssnano', {
        preset: [
          'default',
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
