# @1stg/simple-git-hooks

Personal but Shareable simple-git-hooks Configuration for all 1stG.me projects.

## Usage

`.simple-git-hooks.js`:

```js
import { defineConfig } from '@1stg/simple-git-hooks'

export default defineConfig()
```

## Options

| Option   | Default              | Description                              |
| -------- | -------------------- | ---------------------------------------- |
| `runner` | detected, else `npx` | Script runner used in the hook commands. |

The runner is detected from the lockfile (`yarn`, `pnpm`, …) by default; pass it
explicitly when the hooks run in an environment where detection is unreliable.
