# Migrating `@1stg/stylelint-config`

> Applies to **v7 → v8**.

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

## Detection

`prettier` is enabled when `stylelint-prettier` is installed (it is an optional
peer now), and `vue` is enabled when `vue` is installed; both can be overridden
explicitly. Angular support is dropped.
