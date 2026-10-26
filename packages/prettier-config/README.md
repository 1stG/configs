# @1stg/prettier-config

Personal but Shareable Prettier Configuration for all 1stG.me projects.

## Usage

`.prettierrc`:

```json
"@1stg/prettier-config"
```

or, with options:

```js
// prettier.config.js
import { defineConfig } from '@1stg/prettier-config'

export default defineConfig({ framework: 'vue', nextjs: true })
```

## Plugins

The plugins for the languages Oxfmt cannot format (Pug, Ruby, XML, Go
templates, INI, JSDoc, properties, shell, Stylus, TOML, package.json) are
**optional peer dependencies**: install only the ones you need.

`defineConfig` resolves the installed entry points with `import.meta.resolve`
and skips missing packages; Prettier imports the plugin code when it formats.
Pass `plugins` to override the detected list.

## Options

| Option        | Default | Description                                    |
| ------------- | ------- | ---------------------------------------------- |
| `framework`   | —       | Use `angular` or `vue` for `*.html`.           |
| `nextjs`      | `false` | Parse TS/TSX with `babel-ts`, as Next.js does. |
| `semi`        | `false` | Print semicolons.                              |
| `singleQuote` | `true`  | Use single quotes.                             |
