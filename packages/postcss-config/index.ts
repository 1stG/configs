import { NODE_ENV } from '@pkgr/utils'
import autoprefixer from 'autoprefixer'
import cssnanoPlugin from 'cssnano'
import type { AcceptedPlugin } from 'postcss'
import postcssImport from 'postcss-import'
import postcssModules from 'postcss-modules'
import postcssNormalize from 'postcss-normalize'
import postcssPresetEnv from 'postcss-preset-env'
import postcssUrl from 'postcss-url'

export interface Config {
  env?: string
  map?: boolean | object
  plugins: AcceptedPlugin[]
  [key: string]: unknown
}

export interface ConfigOptions {
  /** Use `cssnano-preset-advanced` when minifying. @default false */
  advanced?: boolean
  /** Extra cssnano options; `false` disables minification. */
  cssnano?: false | Record<string, unknown>
  /** Value of `config.env`. @default process.env.NODE_ENV */
  env?: string
  /** Options for `postcss-import`. */
  import?: Record<string, unknown>
  /** Inline source map. @default env === 'development' */
  map?: boolean
  /** Minify with cssnano. @default env === 'production' */
  minify?: boolean
  /** Options for `postcss-modules`. */
  modules?: boolean | object
  /** Options for `postcss-normalize`. */
  normalize?: Record<string, unknown>
  /** Options for `postcss-preset-env`. */
  presetEnv?: Record<string, unknown>
  /** Extra options merged into the cssnano preset. */
  presetOptions?: Record<string, unknown>
  /** Extra PostCSS plugins, appended last. */
  plugins?: AcceptedPlugin[]
  /** Options for `postcss-url`. */
  url?: Record<string, unknown>
}

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
}: ConfigOptions = {}): Config => {
  const isProduction = env === 'production'
  const shouldMinify = cssnano === false ? false : (minify ?? isProduction)
  const shouldMap = map ?? env === 'development'
  const cssnanoOptions =
    typeof cssnano === 'object'
      ? (cssnano as Record<string, unknown>)
      : undefined

  const plugins: AcceptedPlugin[] = [
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
        ...cssnanoOptions,
        preset: (cssnanoOptions?.preset ?? [
          advanced ? 'advanced' : 'default',
          {
            discardComments: {
              removeAll: true,
            },
            ...presetOptions,
          },
        ]) as never,
      }),
    )
  }

  plugins.push(...extraPlugins)

  return {
    ...options,
    env,
    map: shouldMap,
    plugins,
  }
}

export default defineConfig
