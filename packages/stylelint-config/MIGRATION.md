# Migrating `@1stg/stylelint-config`

## Removed subpaths

| Before                              | After                               |
| ----------------------------------- | ----------------------------------- |
| `@1stg/stylelint-config/loose`      | `defineConfig({ scssLoose: true })` |
| `@1stg/stylelint-config/modules`    | `defineConfig({ modules: true })`   |
| `@1stg/stylelint-config/scss`       | `defineConfig({ scss: true })`      |
| `@1stg/stylelint-config/scss/loose` | `defineConfig({ scssLoose: true })` |

## Before

```js
// .stylelintrc.cjs
module.exports = require('@1stg/stylelint-config/scss/loose')
```

## After

```js
// stylelint.config.js
import { defineConfig } from '@1stg/stylelint-config'

export default defineConfig({ scssLoose: true })
```

## Removed detection

The config no longer adds `stylelint-prettier` when ESLint is installed; pass
`prettier: true` explicitly. `vue: true` and `angular: true` only adjust the
ignored pseudo-elements; Angular support is otherwise dropped.
