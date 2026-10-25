// @ts-check

const { NODE_ENV } = require('@pkgr/utils')

/**
 * @typedef {object} PostcssConfigOptions
 * @property {boolean} [advanced=false] Use `cssnano-preset-advanced` when minifying.
 * @property {false | Record<string, unknown>} [cssnano] Extra cssnano options; `false` disables minification.
 * @property {string} [env=NODE_ENV] Value of `config.env`.
 * @property {object} [import] Options for `postcss-import`.
 * @property {boolean} [map] Inline source map; defaults to `env === 'development'`.
 * @property {boolean} [minify] Minify with cssnano; defaults to `env === 'production'`.
 * @property {boolean | object} [modules] Options for `postcss-modules`.
 * @property {object} [normalize] Options for `postcss-normalize`.
 * @property {object} [presetEnv] Options for `postcss-preset-env`.
 * @property {object} [presetOptions] Extra options for the cssnano preset.
 * @property {unknown[]} [plugins] Extra PostCSS plugins, appended last.
 * @property {object} [url] Options for `postcss-url`.
 */

/** @import { ConfigFn, ConfigPlugin } from 'postcss-load-config' */

/**
 * Build a PostCSS config. The returned function is what `postcss-load-config`
 * expects, so `.postcssrc.cjs` can `module.exports = require('@1stg/postcss-config')`.
 *
 * @param {PostcssConfigOptions} [options]
 * @returns {ReturnType<ConfigFn>}
 */
const createConfig = ({
  advanced = false,
  cssnano,
  env = NODE_ENV,
  import: importOptions,
  map,
  minify,
  modules,
  normalize,
  plugins: extraPlugins = [],
  presetEnv,
  presetOptions,
  url,
  ...options
} = {}) => {
  const isProduction = env === 'production'
  const shouldMinify = cssnano === false ? false : (minify ?? isProduction)
  const shouldMap = map ?? env === 'development'

  /** @type {ConfigPlugin[]} */
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
        generateScopedName: isProduction
          ? '[hash:base64:10]'
          : '[path][name]__[local]---[hash:base64:5]',
        ...modules,
      }),
    )
  }

  if (shouldMinify) {
    plugins.push(
      require('cssnano')({
        ...cssnano,
        preset: cssnano?.preset ?? [
          advanced ? 'advanced' : 'default',
          {
            discardComments: {
              removeAll: true,
            },
            ...presetOptions,
          },
        ],
      }),
    )
  }

  plugins.push(.../** @type {ConfigPlugin[]} */ (extraPlugins))

  return {
    ...options,
    env,
    map: shouldMap,
    plugins,
  }
}

module.exports = createConfig
module.exports.createConfig = createConfig
module.exports.default = createConfig
