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

## Lazy plugins

The config ships the plugins for the languages Oxfmt cannot format (Pug,
Ruby, XML, Go templates, INI, properties, shell, Stylus, TOML) and resolves
their entry points with `import.meta.resolve`. Prettier imports the plugin
code only when it needs those languages, so loading the config itself stays
cheap.

## Options

| Option        | Default | Description                                    |
| ------------- | ------- | ---------------------------------------------- |
| `framework`   | —       | Use `angular` or `vue` for `*.html`.           |
| `nextjs`      | `false` | Parse TS/TSX with `babel-ts`, as Next.js does. |
| `semi`        | `false` | Print semicolons.                              |
| `singleQuote` | `true`  | Use single quotes.                             |
