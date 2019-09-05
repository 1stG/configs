module.exports = ctx => {
  const config = {
    plugins: [
      require('postcss-preset-env'),
      require('postcss-import'),
      require('postcss-normalize'),
      require('autoprefixer'),
    ],
  }

  if (ctx.env === 'production') {
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
