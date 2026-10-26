# @1stg/markuplint-config

Personal but Shareable markuplint Configuration for all 1stG.me projects.

## Usage

`markuplint.config.js`:

```js
import { defineConfig } from '@1stg/markuplint-config'

export default defineConfig({ vue: true })
```

The default export is the zero-config version and can be used from
`.markuplintrc` with `"extends": ["@1stg/markuplint-config"]`.

## Options

| Option | Default | Description                  |
| ------ | ------- | ---------------------------- |
| `vue`  | `false` | Add the Vue parser and spec. |

The base rules are declared inline rather than through
`markuplint:recommended`: extending that preset drops the framework `parser`
mapping, which made `.vue` files fall back to the HTML parser.
