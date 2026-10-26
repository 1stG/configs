# Migrating `@1stg/prettier-config`

> Applies to **v6 → v7**.

The package is still published, but the subpath entry points are replaced by
`defineConfig(options)`.

| Before                            | After                                  |
| --------------------------------- | -------------------------------------- |
| `@1stg/prettier-config/vue`       | `defineConfig({ framework: 'vue' })`   |
| `@1stg/prettier-config/semi`      | `defineConfig({ semi: true })`         |
| `@1stg/prettier-config/quote`     | `defineConfig({ singleQuote: false })` |
| `@1stg/prettier-config/semi/next` | `defineConfig({ semi: true })`         |

## Before

```json
{ "extends": ["@1stg/prettier-config/vue"] }
```

## After

```js
// prettier.config.js
import { defineConfig } from '@1stg/prettier-config'

export default defineConfig({ framework: 'vue' })
```

`/next` (and `/semi/next`) used the `babel-ts` parser. Babel is gone, so there
is no replacement parser option: use the default `typescript` parser, and
`defineConfig({ semi: true })` for the semi variant. The default export is
still usable directly from `.prettierrc`:

```json
"@1stg/prettier-config"
```

## Plugins are optional peers

Install only the Prettier plugins for the languages you format. `defineConfig`
resolves the installed ones with `import.meta.resolve` and skips missing peers;
Prettier imports the plugin code itself. Pass `plugins` to control the list.
