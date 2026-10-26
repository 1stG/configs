# Migrating to `@1stg/oxfmt-config`

This package replaces the formatting side of `@1stg/prettier-config` for the
languages Oxfmt supports.

## Before

```json
{ "prettier": "@1stg/prettier-config" }
```

## After

```js
// oxfmt.config.ts
import { defineConfig } from '@1stg/oxfmt-config'

export default defineConfig({ printWidth: 80, semi: false })
```

Oxfmt discovers `oxfmt.config.ts` automatically. It formats JS, TS, JSX, JSON,
CSS, SCSS, Less, GraphQL, TOML, YAML and Markdown natively, and bundles
Prettier for HTML, Angular, Vue, Svelte, Astro, MDX, Handlebars and MJML.

## Prettier plugins

Oxfmt does not support Prettier plugins. Keep `@1stg/prettier-config` for Pug,
Ruby, XML, Go templates, shell, INI, properties, Stylus and Sass.
