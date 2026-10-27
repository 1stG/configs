# Migrating `@1stg/eslint-config`

> Applies to **v11 → v12**.

This package is now **only** for file types Oxlint cannot parse. JS/TS/JSX and
Vue move to `@1stg/oxlint-config`.

## Before

```js
// eslint.config.js
import config from '@1stg/eslint-config'

export default config
```

## After

```js
// eslint.config.js
import { defineConfig } from '@1stg/eslint-config'

export default defineConfig()
```

`defineConfig()` is async because the plugins are imported dynamically; ESLint
awaits it automatically. HTML can be linted through `eslint-plugin-markup` (optional peer, Node >= 24);
the `markup` option is enabled automatically when installed, and `*.html` is
then no longer ignored. Run ESLint on the remaining extensions only:

```sh
eslint "**/*.{md,mdx,json,jsonc,json5,yaml,yml,toml}"
```

The old subpath entry points and the full JS/TS rule set are gone. Use
`@1stg/oxlint-config` for code, and this package for the data/documentation
formats. `eslint-plugin-oxlint` turns off rules that Oxlint already implements.
