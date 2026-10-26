# @1stg/prettier-config

Personal but Shareable Prettier Configuration for all 1stG.me projects.

## Usage

`.prettierrc`:

```json
"@1stg/prettier-config"
```

or, with options:

```js
// prettier.config.js
import { defineConfig } from '@1stg/prettier-config'

export default defineConfig({ framework: 'vue' })
```

## Plugins

The plugins for the languages Oxfmt cannot format (Pug, Ruby, XML, Go
templates, INI, JSDoc, properties, shell, Stylus, TOML, package.json) are
**optional peer dependencies**: install only the ones you need.

`prettier-plugin-pkg` is installed by default; the other plugins are optional
peers. `defineConfig` derives the candidate list from this package's
`dependencies` and `peerDependencies`, resolves the installed entry points
with `import.meta.resolve` and skips missing packages. Pass `plugins` to
override the detected list.

## Options

| Option        | Default | Description             |
| ------------- | ------- | ----------------------- |
| `framework`   | —       | Use `vue` for `*.html`. |
| `semi`        | `false` | Print semicolons.       |
| `singleQuote` | `true`  | Use single quotes.      |

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
