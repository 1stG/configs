# @1stg/eslint-config

ESLint is kept for the file types Oxlint cannot parse:

- Markdown/MDX (`eslint-plugin-mdx`)
- JSON/JSONC/JSON5 (`eslint-plugin-jsonc`)
- YAML (`eslint-plugin-yml`)
- TOML (`eslint-plugin-toml`)

By default JS/TS/JSX/Vue stay on `@1stg/oxlint-config`. When
`typescript-eslint` is installed, `code` mode is enabled automatically and
lints JS/TS/JSX with `typescript-eslint` plus optional
`eslint-plugin-regexp` / `eslint-plugin-sonarjs`, while
`eslint-plugin-oxlint` disables every rule Oxlint already covers. Pass
`code: false` to keep the thin file-type-only behavior. Vue templates remain
with Oxlint/markuplint.

## Usage

```js
// eslint.config.js
import { defineConfig } from '@1stg/eslint-config'

export default defineConfig()
```

`eslint-plugin-mdx`, `eslint-plugin-jsonc` and `eslint-plugin-oxlint` are
installed by default, so Markdown/JSON(C) linting and the Oxlint rule-disable
list are on. `eslint-plugin-yml` and `eslint-plugin-toml` are optional peers,
enabled only when installed (`import.meta.resolve`). ESLint awaits the returned promise. Use
`export default await defineConfig()` if your tool does not await it.

`eslint-plugin-markup` is an optional peer: when installed on Node >= 24,
`markup` is enabled by default and `**/*.html` is no longer ignored. The
default ignores skip code owned by Oxlint (`.js/.ts/.jsx/.tsx/.vue`), styles
owned by Stylelint, HTML owned by markuplint, lockfiles and build output.
`code` defaults to whether `typescript-eslint` is installed; set `code: true`
to force it or `code: false` to disable it. Run ESLint only on the non-code
extensions when code mode is off:

```sh
eslint "**/*.{md,mdx,json,jsonc,json5,yaml,yml,toml}"
```

The default export can be re-exported directly:

```js
export { default } from '@1stg/eslint-config'
```

Use `defineConfig` only when you need options.

## Options

| Option     | Default                       | Description                                                         |
| ---------- | ----------------------------- | ------------------------------------------------------------------- |
| `markdown` | `true`                        | Lint Markdown/MDX.                                                  |
| `jsonc`    | `true`                        | Lint JSON/JSONC/JSON5.                                              |
| `yaml`     | installed                     | Lint YAML when installed.                                           |
| `toml`     | installed                     | Lint TOML when installed.                                           |
| `code`     | installed `typescript-eslint` | Lint JS/TS/JSX with rules Oxlint does not cover.                    |
| `oxlint`   | `true`                        | Disable rules Oxlint already owns.                                  |
| `markup`   | auto                          | Lint HTML with `eslint-plugin-markup` on Node >= 24 when installed. |
| `ignores`  | `[]`                          | Extra ignore patterns.                                              |

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
