import type { AcceptedPlugin } from 'postcss'

declare const createConfig: {
  (options?: createConfig.Options): createConfig.Config
  createConfig: (options?: createConfig.Options) => createConfig.Config
  default: (options?: createConfig.Options) => createConfig.Config
}

declare namespace createConfig {
  interface Config {
    env?: string
    map?: boolean | object
    plugins: AcceptedPlugin[]
    [key: string]: unknown
  }

  interface Options {
    /** Use `cssnano-preset-advanced` when minifying. @default false */
    advanced?: boolean
    /** Extra cssnano options; `false` disables minification. */
    cssnano?: false | Record<string, unknown>
    /** Value of `config.env`. @default process.env.NODE_ENV */
    env?: string
    /** Options for `postcss-import`. */
    import?: object
    /** Inline source map. @default env === 'development' */
    map?: boolean
    /** Minify with cssnano. @default env === 'production' */
    minify?: boolean
    /** Options for `postcss-modules`. */
    modules?: boolean | object
    /** Options for `postcss-normalize`. */
    normalize?: object
    /** Options for `postcss-preset-env`. */
    presetEnv?: object
    /** Extra options merged into the cssnano preset. */
    presetOptions?: object
    /** Extra PostCSS plugins, appended last. */
    plugins?: AcceptedPlugin[]
    /** Options for `postcss-url`. */
    url?: object
  }
}

export = createConfig
