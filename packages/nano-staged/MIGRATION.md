# Migrating `@1stg/nano-staged`

> Applies to **v1 → v2**.

## Removed subpaths

`/tsc`, `/ngc` and `/vue-tsc` are replaced by the `typecheck` option.

## Before

```json
{
  "*.ts?(x)": "tsc -p tsconfig.json --noEmit"
}
```

with `import config from '@1stg/nano-staged/tsc'`.

## After

```js
// nano-staged.config.js
import { defineConfig } from '@1stg/nano-staged'

export default defineConfig({
  formatter: 'both',
  linter: 'oxlint',
  stylelint: true,
  typecheck: 'tsc',
  typeCoverage: true,
})
```

## Auto-detected defaults

The tool-availability defaults are inferred from installed packages again:

- `linter`: `'oxlint'` if installed, otherwise `'eslint'`, otherwise `false`
- `stylelint`: enabled when `stylelint` is installed
- `typeCoverage`: enabled when `type-coverage` is installed
- `imagemin`: enabled when `@pkgr/imagemin` is installed (renamed from
  `imagemagick`)

`formatter` and `typecheck` stay explicit because they are project choices, not
just tool availability. `commands` still lets you override a single command.
