# @1stg/commitlint-config

Personal but Shareable Commitlint Configuration for all 1stG.me projects.

## Usage

`commitlint.config.js`:

```js
import { defineConfig } from '@1stg/commitlint-config'

export default defineConfig({ monorepo: true })
```

The default export is the conventional config alone:

```json
{ "extends": ["@1stg/commitlint-config"] }
```

## Options

| Option     | Default | Description                                               |
| ---------- | ------- | --------------------------------------------------------- |
| `monorepo` | `false` | Also validate scopes against the workspace package names. |

`monorepo` defaults to `isMonorepo()` (the presence of workspaces in the nearest
`package.json`) and can be overridden explicitly.
