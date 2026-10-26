# Migrating `@1stg/prettier-config`

The package is still published, but the subpath entry points are replaced by
`defineConfig(options)`.

| Before                            | After                                        |
| --------------------------------- | -------------------------------------------- |
| `@1stg/prettier-config/vue`       | `defineConfig({ framework: 'vue' })`         |
| `@1stg/prettier-config/angular`   | `defineConfig({ framework: 'angular' })`     |
| `@1stg/prettier-config/next`      | `defineConfig({ nextjs: true })`             |
| `@1stg/prettier-config/semi`      | `defineConfig({ semi: true })`               |
| `@1stg/prettier-config/quote`     | `defineConfig({ singleQuote: false })`       |
| `@1stg/prettier-config/semi/next` | `defineConfig({ semi: true, nextjs: true })` |

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

The default export is still usable directly from `.prettierrc`:

```json
"@1stg/prettier-config"
```

## Plugins are lazy

Plugin entry points are resolved with `import.meta.resolve` when the config is
loaded, but Prettier imports the plugin code only when it formats a matching
language.
