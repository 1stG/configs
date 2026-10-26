# Migrating `@1stg/markuplint-config`

> Applies to **v5 → v6**.

## Removed subpaths

| Before                            | After                                    |
| --------------------------------- | ---------------------------------------- |
| `@1stg/markuplint-config/vue`     | `defineConfig({ vue: true })`            |
| `@1stg/markuplint-config/angular` | Removed; Angular is no longer supported. |

## Before

```json
{ "extends": ["@1stg/markuplint-config/vue"] }
```

## After

```js
// markuplint.config.js
import { defineConfig } from '@1stg/markuplint-config'

export default defineConfig({ vue: true })
```

The Vue parser and spec are applied together; the base config no longer uses
`extends`, because that dropped the framework parser.
