import { createRequire } from 'node:module'

import type { AcceptedPlugin, ProcessOptions } from 'postcss'

const require = createRequire(import.meta.url)

export interface Config extends ProcessOptions {
  env?: string
  plugins: AcceptedPlugin[]
}

export interface ConfigOptions extends ProcessOptions {
  /** Use `cssnano-preset-advanced` when minifying. @default false */
  advanced?: boolean
  /** Extra cssnano options; `false` disables minification. */
  cssnano?: false | Record<string, unknown>
  /** Value of `config.env`. @default process.env.NODE_ENV */
  env?: string
  /** Options for `postcss-import`. */
  import?: Record<string, unknown>
  /** Minify with cssnano. @default env === 'production' */
  minify?: boolean
  /** Options for `postcss-modules`. */
  modules?: boolean | object
  /** Options for `postcss-normalize`. */
  normalize?: Record<string, unknown>
  /** Extra PostCSS plugins, appended last. */
  plugins?: AcceptedPlugin[]
  /** Options for `postcss-preset-env`. */
  presetEnv?: Record<string, unknown>
  /** Extra options merged into the cssnano preset. */
  presetOptions?: Record<string, unknown>
  /** Options for `postcss-url`. */
  url?: Record<string, unknown>
}

export const defineConfig = ({
  advanced = false,
  cssnano,
  env = process.env.NODE_ENV ?? 'development',
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
  const cssnanoOptions =
    typeof cssnano === 'object' ? (cssnano as Record<string, unknown>) : undefined

  const plugins: AcceptedPlugin[] = [
    require('postcss-preset-env')(presetEnv),
    require('postcss-import')(importOptions),
    require('postcss-normalize')(normalize),
    require('postcss-url')(url),
    require('autoprefixer')(),
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
        ...(typeof modules === 'object' ? modules : {}),
      }),
    )
  }

  if (shouldMinify) {
    plugins.push(
      require('cssnano')({
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
    map: map ?? env === 'development',
    plugins,
  }
}

export default defineConfig
