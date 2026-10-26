# @1stg/nano-staged

Personal but Shareable [nano-staged](https://npmjs.com/package/nano-staged)
Configuration for all 1stG.me projects.

## Usage

`.nano-staged.js`:

```js
import { defineConfig } from '@1stg/nano-staged'

export default defineConfig({
  formatter: 'both',
  linter: 'oxlint',
  stylelint: true,
  typecheck: 'tsc',
})
```

## Options

| Option         | Default         | Description                                                                  |
| -------------- | --------------- | ---------------------------------------------------------------------------- |
| `formatter`    | `'prettier'`    | `'oxfmt'`, `'prettier'`, `'both'` (Oxfmt plus Prettier fallback) or `false`. |
| `linter`       | `false`         | `'oxlint'`, `'eslint'` or `false`.                                           |
| `stylelint`    | `false`         | Run `stylelint --fix` on style files.                                        |
| `typecheck`    | `false`         | `'tsc'`, `'ngc'`, `'vue-tsc'` or `false`.                                    |
| `tsconfig`     | discovered      | Explicit `tsconfig` path, resolved once when the config loads.               |
| `typeCoverage` | `false`         | Run `type-coverage` with the type-check.                                     |
| `imagemagick`  | `false`         | Optimize images with the `i` command.                                        |
| `commands`     | `{}`            | Override a command, e.g. `{ oxfmt: 'oxfmt -c oxfmt.config.mjs' }`.           |
| `cwd`          | `process.cwd()` | Base directory for `tsconfig` discovery.                                     |

`'both'` formats everything [Oxfmt](../oxfmt-config) supports and leaves the
languages that need Prettier plugins (Pug, Ruby, shell, INI, properties,
Stylus, Sass) to `prettier --write`.
