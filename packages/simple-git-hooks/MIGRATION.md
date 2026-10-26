# Migrating `@1stg/simple-git-hooks`

> Applies to **v2 → v3**.

The default export is still an object with the same hooks. The runner is now an
explicit option instead of a module-load-time detection:

```js
// .simple-git-hooks.js
import { defineConfig } from '@1stg/simple-git-hooks'

export default defineConfig({ runner: 'pnpm' })
```

`defineConfig()` keeps the old `getScriptRunner() || 'npx'` behavior. Hooks are
only generated for installed tools: `pre-commit` for `nano-staged` and
`commit-msg` for `@commitlint/cli`. The package is ESM only.
