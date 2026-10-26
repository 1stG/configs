# @1stg/oxfmt-config

Personal but Shareable [Oxfmt](https://oxc.rs/docs/guide/usage/formatter) Configuration for all 1stG.me projects.

## Usage

```js
// oxfmt.config.ts
import { defineConfig } from '@1stg/oxfmt-config'

export default defineConfig({
  vue: true,
})
```

```sh
oxfmt .
```

The default export is the zero-config version, and can be referenced directly by
a `.oxfmtrc.json`-based setup or imported by a JS config.

## Options

| Option            | Default | Description                                                     |
| ----------------- | ------- | --------------------------------------------------------------- |
| `printWidth`      | `80`    | Line width (Oxfmt's own default is `100`).                      |
| `semi`            | `false` | Print semicolons.                                               |
| `singleQuote`     | `true`  | Use single quotes.                                              |
| `sortImports`     | `true`  | Sort imports and exports.                                       |
| `sortPackageJson` | `false` | Sort `package.json` keys; use `@1stg/prettier-config` for that. |
| `ignorePatterns`  | `[]`    | Gitignore-style patterns to skip.                               |
| `jsdoc`           | `false` | Format JSDoc comments.                                          |
| `overrides`       | `[]`    | File-specific overrides.                                        |

## Coverage

Oxfmt formats most languages natively and delegates HTML, Vue, Svelte, Astro,
MDX, Handlebars and MJML to its bundled Prettier. It does **not** support
Prettier plugins: for Pug, Ruby, shell, INI, properties and Stylus, configure
Prettier (and the matching plugins) in the project that still needs them.
