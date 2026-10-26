# Migrating `@1stg/postcss-config`

## Before (CommonJS)

```js
// .postcssrc.cjs
module.exports = require('@1stg/postcss-config')
```

## After (ESM)

```js
// postcss.config.js
import { defineConfig } from '@1stg/postcss-config'

export default defineConfig()
```

The package is ESM only. PostCSS auto-discovers `postcss.config.js` in an ESM
package (or use `postcss.config.mjs`).

## Options instead of a frozen `NODE_ENV`

`env` now controls minification and source maps at call time instead of reading
`__DEV__`/`__PROD__` at import time:

- `minify` — defaults to `env === 'production'`
- `map` — defaults to `env === 'development'`
- `cssnano: false` disables minification regardless of `env`

New options: `cssnano`, `presetOptions`, `map`, `minify`, `plugins`.
