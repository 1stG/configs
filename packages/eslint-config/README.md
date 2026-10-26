# @1stg/eslint-config

ESLint is kept for the file types Oxlint cannot parse:

- Markdown/MDX (`eslint-plugin-mdx`)
- JSON/JSONC/JSON5 (`eslint-plugin-jsonc`)
- YAML (`eslint-plugin-yml`)
- TOML (`eslint-plugin-toml`)

JS/TS/JSX/Vue stay on `@1stg/oxlint-config`. `eslint-plugin-oxlint` disables
the rules Oxlint already covers, so nothing is reported twice.

## Usage

```js
// eslint.config.js
import { defineConfig } from '@1stg/eslint-config'

export default defineConfig()
```

`eslint-plugin-mdx` and `eslint-plugin-jsonc` are installed by default, so
Markdown and JSON(C) linting is on. `eslint-plugin-yml`, `eslint-plugin-toml`
and `eslint-plugin-oxlint` are optional peers, enabled only when installed
(`import.meta.resolve`); every plugin is imported dynamically when enabled. ESLint awaits the returned promise. Use
`export default await defineConfig()` if your tool does not await it.

Run ESLint only on those extensions:

```sh
eslint "**/*.{md,mdx,json,jsonc,json5,yaml,yml,toml}"
```

## Options

| Option     | Default | Description            |
| ---------- | ------- | ---------------------- |
| `markdown` | `true`  | Lint Markdown/MDX.     |
| `jsonc`    | `true`  | Lint JSON/JSONC/JSON5. |
| `yaml`     | `true`  | Lint YAML.             |
| `toml`     | `true`  | Lint TOML.             |
| `ignores`  | `[]`    | Extra ignore patterns. |

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
