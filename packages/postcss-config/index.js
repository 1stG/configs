const DEV = 'development'

module.exports = ({
  advanced,
  env = process.env.NODE_ENV || DEV,
  import: importOptions,
  modules,
  normalize,
  presetEnv,
  url,
  ...options
} = {}) => {
  const plugins = [
    require('postcss-preset-env')(presetEnv),
    require('postcss-import')(importOptions),
    require('postcss-normalize')(normalize),
    require('postcss-url')(url),
    require('autoprefixer'),
  ]

  const isDev = env === DEV
  const isProd = env === 'production'

  if (modules) {
    plugins.push(
      require('postcss-modules')({
        globalModulePaths: [
          /[/\\]node_modules[/\\]/,
          /(\bglobals?[/\\][\w-]+|\.globals?)\.(p?css|less|s[ac]ss|styl(us)?)$/,
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
      require('cssnano')({
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
    map: isDev,
    plugins,
  }
}
