# @1stg/postcss-config

Personal but Shareable PostCSS Configuration for all 1stG.me projects.

## Usage

`.postcssrc.cjs`:

```js
module.exports = require('@1stg/postcss-config')
```

or, with options:

```js
// postcss.config.mjs
import { createConfig } from '@1stg/postcss-config'

export default createConfig({ advanced: true })
```

The default export is a PostCSS config function, so it works with
`postcss-load-config` as-is.

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
