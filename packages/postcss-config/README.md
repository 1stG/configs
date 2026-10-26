# @1stg/postcss-config

Personal but Shareable PostCSS Configuration for all 1stG.me projects.

## Usage

`postcss.config.js`:

```js
import { defineConfig } from '@1stg/postcss-config'

export default defineConfig({ advanced: true })
```

The package is ESM only, matching `postcss-load-config` v6: PostCSS loads
`postcss.config.js` (or `postcss.config.js` in an ESM package) natively. The
default export is the config function itself, so `export { default } from
'@1stg/postcss-config'` works too and defers `NODE_ENV` until PostCSS calls it.

## Options

| Option          | Default                 | Description                                      |
| --------------- | ----------------------- | ------------------------------------------------ |
| `advanced`      | `false`                 | Use `cssnano-preset-advanced` when minifying.    |
| `env`           | `process.env.NODE_ENV`  | Value of `config.env`.                           |
| `minify`        | `env === 'production'`  | Minify with cssnano.                             |
| `cssnano`       | —                       | Extra cssnano options, or `false` to disable it. |
| `map`           | `env === 'development'` | Inline source map.                               |
| `modules`       | —                       | Options for `postcss-modules`.                   |
| `presetEnv`     | —                       | Options for `postcss-preset-env`.                |
| `presetOptions` | —                       | Extra options for the cssnano preset.            |
| `import`        | —                       | Options for `postcss-import`.                    |
| `normalize`     | —                       | Options for `postcss-normalize`.                 |
| `url`           | —                       | Options for `postcss-url`.                       |
| `plugins`       | `[]`                    | Extra PostCSS plugins, appended last.            |

Unlike the previous version, minification is driven by the `env` option rather
than a module-level `NODE_ENV` snapshot, so it can be overridden per call.
