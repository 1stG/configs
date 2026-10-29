# @1stg/oxlint-config

Personal but Shareable [Oxlint](https://oxc.rs/docs/guide/usage/linter) Configuration for all 1stG.me projects.

## Usage

```js
// oxlint.config.ts
import { defineConfig } from '@1stg/oxlint-config'

export default defineConfig({
  react: true,
  vitest: true,
})
```

```sh
oxlint .
```

The default export is the zero-config version, for tools that can import a
config object directly.

The default export can be re-exported directly:

```js
export { default } from '@1stg/oxlint-config'
```

Use `defineConfig` only when you need options.

## Options

| Option           | Default                                  | Description                                                  |
| ---------------- | ---------------------------------------- | ------------------------------------------------------------ |
| `categories`     | `{ correctness: 'error', perf: 'warn' }` | Oxlint categories.                                           |
| `jsdoc`          | `true`                                   | Enable the JSDoc plugin.                                     |
| `jsPlugins`      | `[]`                                     | ESLint plugins to load (alpha).                              |
| `rules`          | `{}`                                     | Extra rule overrides.                                        |
| `ignorePatterns` | `[]`                                     | Native Oxlint ignore patterns.                               |
| `node`           | `true`                                   | Node.js globals and rules.                                   |
| `promise`        | `true`                                   | Enable the Promise plugin.                                   |
| `react`          | installed `react`                        | React, JSX accessibility and perf rules.                     |
| `vue`            | installed `vue`                          | Vue rules.                                                   |
| `vitest`         | installed `vitest`                       | Vitest globals and rules.                                    |
| `jest`           | installed `jest`                         | Jest globals and rules.                                      |
| `typeAware`      | installed `oxlint-tsgolint`              | Enable rules requiring type info.                            |
| `noMagicNumbers` | `undefined`                              | Options merged into `no-magic-numbers`; `false` disables it. |

`ignorePatterns` is the native Oxlint field and can be passed directly; there
is no separate `ignores` alias.

## `no-magic-numbers`

The shared rule ignores common identity, time/calendar, decimal/binary and
HTTP values (`-1` through `3600`) by default, while leaving project-specific
constants to consumers. Structural positions are ignored by default
(`ignoreArrayIndexes`, `ignoreNumericLiteralTypes`, `ignoreTypeIndexes`), and
named declarations count as intentional (`enforceConst`, `ignoreDefaultValues`,
`ignoreEnums`, `ignoreReadonlyClassProperties`,
`ignoreClassFieldInitialValues`). The class-field options overlap: set both
`ignoreReadonlyClassProperties` and `ignoreClassFieldInitialValues` to `false`
to report readonly field initializers. `detectObjects` stays opt-in. Add domain
constants with the dedicated option:

```js
export default defineConfig({
  noMagicNumbers: {
    ignore: [16, 64],
    ignoreEnums: false,
  },
})
```

All other `no-magic-numbers` options are accepted and override the defaults;
`ignore` is merged with the shared list. `rules` overrides are passed through
as-is, so use `noMagicNumbers` when defaults should be merged. Passing `false`
disables the rule.

Import sorting is **not** a lint rule here: Oxfmt's built-in `sortImports` does
it at format time, so `oxlint` and `oxfmt` stay independent.

## Third-party ESLint plugins

Oxlint can load ESLint plugins through `jsPlugins` (alpha, not semver-stable):

```js
import { defineConfig } from '@1stg/oxlint-config'

export default defineConfig({
  jsPlugins: ['eslint-plugin-sonarjs'],
  rules: {
    'sonarjs/no-identical-functions': 'warn',
    'sonarjs/cognitive-complexity': 'warn',
  },
})
```

Plugins resolve relative to the Oxlint config file, so install them in the
project that enables them. Processors and plugins relying on the full ESLint
`SourceCode` API may not work; Oxlint's built-in plugins (TypeScript, unicorn,
import, jsdoc, react, vue, node, promise, Vitest, Jest) cover the rest.

## Notes

- Oxlint parses JavaScript, TypeScript, JSX and Vue. Markdown, JSON, YAML and
  TOML are formatted by `@1stg/oxfmt-config` instead of linted.
- Type-aware rules require the `oxlint-tsgolint` package. `oxlint --type-aware`
  enables Oxlint's own type-aware defaults, but the extra rules added by this
  preset (for example `typescript/no-misused-promises`) are guarded by
  `typeAware` and need `typeAware: true` (or an installed `oxlint-tsgolint`, which
  is the default).

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
