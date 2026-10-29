# Migrating `@1stg/stylelint-config`

## v8.0 → v8.1

Language-specific syntax packages are optional peers now, so install only what
you use:

```sh
# SCSS
yarn add -D postcss-scss stylelint-scss

# Less
yarn add -D postcss-less

# Markdown
yarn add -D postcss-markdown

# HTML/Vue
yarn add -D postcss-html
```

For embedded SCSS or Less in HTML, Vue, or Markdown files, also install the
corresponding parser: `postcss-scss` or `postcss-less`. `postcss-markdown`
handles HTML blocks itself, so `postcss-html` is not needed for HTML in
Markdown.

The unused `postcss-syntax` dependency was removed. The performance/browser
plugins remain regular dependencies and stay enabled.

## v7 → v8

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
