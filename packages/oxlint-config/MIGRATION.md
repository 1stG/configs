# Migrating to `@1stg/oxlint-config`

> New in **v1.0.0**; there is no earlier version to migrate from.

This package replaces `@1stg/eslint-config` for JavaScript/TypeScript/JSX and
Vue linting.

## Before

```js
// eslint.config.js
import config from '@1stg/eslint-config'

export default config
```

## After

```js
// oxlint.config.ts
import { defineConfig } from '@1stg/oxlint-config'

export default defineConfig({ react: true, vue: true, vitest: true })
```

Oxlint discovers `oxlint.config.ts` automatically.

## Missing rules

Third-party ESLint plugins can be loaded through Oxlint's alpha `jsPlugins`
support:

```js
export default defineConfig({
  jsPlugins: ['eslint-plugin-sonarjs'],
  rules: { 'sonarjs/no-identical-functions': 'warn' },
})
```

Install the plugin in the consuming project. Processors and plugins relying on
the full ESLint `SourceCode` API may not work.

## Not covered

Markdown, JSON, JSONC, JSON5, YAML and TOML are no longer linted; Oxfmt formats
them. Import sorting is done by Oxfmt's `sortImports`.
