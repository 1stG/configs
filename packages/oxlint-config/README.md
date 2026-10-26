# @1stg/oxlint-config

Personal but Shareable [Oxlint](https://oxc.rs/docs/guide/usage/linter) Configuration for all 1stG.me projects.

## Usage

```js
// oxlint.config.mjs
import { defineConfig } from '@1stg/oxlint-config'

export default defineConfig({
  react: true,
  vitest: true,
})
```

```sh
oxlint -c oxlint.config.mjs .
```

The default export is the zero-config version, for tools that can import a
config object directly.

## Options

| Option       | Default           | Description                        |
| ------------ | ----------------- | ---------------------------------- |
| `categories` | `['correctness']` | Enabled Oxlint categories.         |
| `jsdoc`      | `true`            | Enable the JSDoc plugin.           |
| `jsPlugins`  | `[]`              | ESLint plugins to load (alpha).    |
| `rules`      | `{}`              | Extra rule overrides.              |
| `node`       | `true`            | Node.js globals and rules.         |
| `promise`    | `true`            | Enable the Promise plugin.         |
| `react`      | `false`           | React and JSX accessibility rules. |
| `vue`        | `false`           | Vue rules.                         |
| `vitest`     | `false`           | Vitest globals and rules.          |
| `jest`       | `false`           | Jest globals and rules.            |
| `ignores`    | `[]`              | Extra ignore patterns.             |

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
- Type-aware rules require the `oxlint-tsgolint` package and `--type-aware`.
