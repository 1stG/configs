# Migrating `@1stg/nano-staged`

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

## No more package sniffing

The old package checked which of ESLint, Stylelint, Prettier and imagemagick
were installed. Pass the tools explicitly:

- `formatter: 'oxfmt' | 'prettier' | 'both' | false` (default `'prettier'`)
- `linter: 'oxlint' | 'eslint' | false` (default `false`)
- `stylelint: boolean` (default `false`)
- `typecheck: 'tsc' | 'ngc' | 'vue-tsc' | false` (default `false`)
- `imagemagick: boolean` (default `false`)

`commands` still lets you override a single command.
