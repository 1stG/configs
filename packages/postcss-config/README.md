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

## Sponsors and Backers

[![Sponsors and Backers](https://raw.githubusercontent.com/1stG/static/master/sponsors.svg)](https://github.com/sponsors/JounQin)

### Sponsors

| 1stG                                                                                                                   | RxTS                                                                                                                   | UnTS                                                                                                                   |
| ---------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| [![1stG Open Collective sponsors](https://opencollective.com/1stG/organizations.svg)](https://opencollective.com/1stG) | [![RxTS Open Collective sponsors](https://opencollective.com/rxts/organizations.svg)](https://opencollective.com/rxts) | [![UnTS Open Collective sponsors](https://opencollective.com/unts/organizations.svg)](https://opencollective.com/unts) |

### Backers

| 1stG                                                                                                                | RxTS                                                                                                                | UnTS                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| [![1stG Open Collective backers](https://opencollective.com/1stG/individuals.svg)](https://opencollective.com/1stG) | [![RxTS Open Collective backers](https://opencollective.com/rxts/individuals.svg)](https://opencollective.com/rxts) | [![UnTS Open Collective backers](https://opencollective.com/unts/individuals.svg)](https://opencollective.com/unts) |

## Changelog

Detailed changes for each release are documented in [CHANGELOG.md](./CHANGELOG.md).

## License

[MIT][] © [JounQin][]@[1stG.me][]

[1stG.me]: https://www.1stG.me
[JounQin]: https://github.com/JounQin
[MIT]: http://opensource.org/licenses/MIT
