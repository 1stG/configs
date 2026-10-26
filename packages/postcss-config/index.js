// @ts-check

import { NODE_ENV } from '@pkgr/utils'
import autoprefixer from 'autoprefixer'
import cssnanoPlugin from 'cssnano'
import postcssImport from 'postcss-import'
import postcssModules from 'postcss-modules'
import postcssNormalize from 'postcss-normalize'
import postcssPresetEnv from 'postcss-preset-env'
import postcssUrl from 'postcss-url'

/**
 * @typedef {object} ConfigOptions
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

/** @import { ConfigPlugin } from 'postcss-load-config' */

/**
 * Build a PostCSS config function, which is what `postcss-load-config` expects.
 *
 * @param {ConfigOptions} [options]
 * @returns {Record<string, unknown>}
 */
export const defineConfig = ({
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
    postcssPresetEnv(presetEnv),
    postcssImport(importOptions),
    postcssNormalize(normalize),
    postcssUrl(url),
    autoprefixer(),
  ]

  if (modules) {
    plugins.push(
      postcssModules({
        globalModulePaths: [
          /[/\\]node_modules[/\\]/,
          /(\bglobals?[/\\][\w-]+|\.globals?)\.(p?css|less|s[ac]ss|styl(us)?)$/,
        ],
        generateScopedName: isProduction
          ? '[hash:base64:10]'
          : '[path][name]__[local]---[hash:base64:5]',
        ...(typeof modules === 'object' ? modules : {}),
      }),
    )
  }

  if (shouldMinify) {
    plugins.push(
      cssnanoPlugin({
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

export default defineConfig
