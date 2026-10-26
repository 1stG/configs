# @1stg/eslint-config

ESLint is kept for the file types Oxlint cannot parse:

- Markdown/MDX (`eslint-plugin-mdx`)
- JSON/JSONC/JSON5 (`eslint-plugin-jsonc`)
- YAML (`eslint-plugin-yml`)
- TOML (`eslint-plugin-toml`)

JS/TS/JSX/Vue stay on `@1stg/oxlint-config`. `eslint-plugin-oxlint` disables
the rules Oxlint already covers, so nothing is reported twice.

## Usage

```js
// eslint.config.js
import { defineConfig } from '@1stg/eslint-config'

export default defineConfig()
```

Run ESLint only on those extensions:

```sh
eslint "**/*.{md,mdx,json,jsonc,json5,yaml,yml,toml}"
```

## Options

| Option     | Default | Description            |
| ---------- | ------- | ---------------------- |
| `markdown` | `true`  | Lint Markdown/MDX.     |
| `jsonc`    | `true`  | Lint JSON/JSONC/JSON5. |
| `yaml`     | `true`  | Lint YAML.             |
| `toml`     | `true`  | Lint TOML.             |
| `ignores`  | `[]`    | Extra ignore patterns. |
