const { NODE_ENV = 'development' } = process.env

module.exports = ({
  advanced,
  env,
  import: importOptions,
  modules,
  normalize,
  presetEnv,
  url,
  ...options
} = {}) => {
  const plugins = [
    require('postcss-preset-env', presetEnv),
    require('postcss-import', importOptions),
    require('postcss-normalize', normalize),
    require('postcss-url', url),
    require('autoprefixer'),
  ]

  const isProd = (env || NODE_ENV) === 'production'

  if (modules) {
    plugins.push(
      require('postcss-modules', {
        globalModulePaths: [
          /[\\/]node_modules[\\/]/,
          /\.global\.(p?css|less|s[ac]ss|styl(us)?)$/,
        ],
        generateScopedName: isProd
          ? '[hash:base64:10]'
          : '[path][name]__[local]---[hash:base64:5]',
        ...modules,
      }),
    )
  }

  if (isProd) {
    plugins.push(
      require('cssnano', {
        preset: [
          advanced ? 'advanced' : 'default',
          {
            discardComments: {
              removeAll: true,
            },
          },
        ],
      }),
    )
  }

  return {
    ...options,
    map: !isProd,
    plugins,
  }
}
