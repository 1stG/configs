# @1stg/commitlint-config

Personal but Shareable Commitlint Configuration for all 1stG.me projects.

## Usage

`commitlint.config.mjs`:

```js
import { createConfig } from '@1stg/commitlint-config'

export default createConfig({ monorepo: true })
```

The default export is the conventional config alone:

```json
{ "extends": ["@1stg/commitlint-config"] }
```

## Options

| Option     | Default | Description                                               |
| ---------- | ------- | --------------------------------------------------------- |
| `monorepo` | `false` | Also validate scopes against the workspace package names. |

Monorepo detection is no longer implicit; pass `monorepo: true` in the config
file so the result does not depend on where commitlint is run from.
