const { NODE_ENV, __DEV__, __PROD__ } = require('@pkgr/utils')

module.exports = ({
  advanced,
  env = NODE_ENV,
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

  if (modules) {
    plugins.push(
      require('postcss-modules')({
        globalModulePaths: [
          /[/\\]node_modules[/\\]/,
          /(\bglobals?[/\\][\w-]+|\.globals?)\.(p?css|less|s[ac]ss|styl(us)?)$/,
        ],
        generateScopedName: __PROD__
          ? '[hash:base64:10]'
          : '[path][name]__[local]---[hash:base64:5]',
        ...modules,
      }),
    )
  }

  if (__PROD__) {
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
    map: __DEV__,
    plugins,
  }
}
