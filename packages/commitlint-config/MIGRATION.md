# Migrating `@1stg/commitlint-config`

No rule change: the default export still detects a monorepo with
`isMonorepo()` and merges `@commitlint/config-workspace-scopes`.

## Before

```json
{ "extends": ["@1stg/commitlint-config"] }
```

## After

```js
// commitlint.config.js
import { defineConfig } from '@1stg/commitlint-config'

export default defineConfig()
```

To disable the workspace scope validation, pass `monorepo: false`:

```js
export default defineConfig({ monorepo: false })
```

The package is ESM only; a CommonJS `commitlint.config.cjs` needs
`module.exports = (await import('@1stg/commitlint-config')).default` via an
async config, or migrate to `commitlint.config.js` with `"type": "module"`.
