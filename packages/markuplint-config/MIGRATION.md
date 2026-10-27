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

The Vue parser and spec are applied together; `vue` defaults to whether `vue`
is installed. The base still extends `markuplint:recommended` and keeps the
framework `parser`/`specs` mapping.

## Peer dependencies

The parser/spec packages are no longer hard dependencies:

- TypeScript users must install `@markuplint/ml-config` for the public `Config`
  types.
- Vue users must install `@markuplint/vue-parser` and `@markuplint/vue-spec`,
  whether Vue is detected automatically or enabled with `vue: true`.
