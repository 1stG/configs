# Migrating `@1stg/commitlint-config`

> Applies to **v7 → v8**.

**`extends` keeps working unchanged.** Commitlint loads the package's default
export, which still detects a monorepo with `isMonorepo()` and merges
`@commitlint/config-workspace-scopes`:

```json
{ "extends": ["@1stg/commitlint-config"] }
```

Nothing in that setup has to change.

## Optional: options via `defineConfig`

Use `defineConfig` only when you need to pass options, for example to disable
the workspace scope validation:

```js
// commitlint.config.js
import { defineConfig } from '@1stg/commitlint-config'

export default defineConfig({ monorepo: false })
```

`defineConfig()` with no arguments is equivalent to the `extends` form. The
package itself is ESM, but commitlint's loader handles that transparently, so
`extends` consumers do not need an ESM config.
