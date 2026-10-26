# @1stg/simple-git-hooks

Personal but Shareable simple-git-hooks Configuration for all 1stG.me projects.

## Usage

`.simple-git-hooks.js`:

```js
import { defineConfig } from '@1stg/simple-git-hooks'

export default defineConfig()
```

The default export can be re-exported directly:

```js
export { default } from '@1stg/simple-git-hooks'
```

Use `defineConfig` only when you need options.

## Options

| Option   | Default              | Description                              |
| -------- | -------------------- | ---------------------------------------- |
| `runner` | detected, else `npx` | Script runner used in the hook commands. |

The runner is detected from the lockfile (`yarn`, `pnpm`, …) by default; pass it
explicitly when the hooks run in an environment where detection is unreliable.
`pre-commit` is only generated when `nano-staged` is installed, and `commit-msg`
only when `@commitlint/cli` is installed.

## Sponsors and Backers

[![Sponsors and Backers](https://raw.githubusercontent.com/1stG/static/master/sponsors.svg)](https://github.com/sponsors/JounQin)

### Sponsors

| 1stG                                                                                                                   | RxTS                                                                                                                   | UnTS                                                                                                                   |
| ---------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| [![1stG Open Collective sponsors](https://opencollective.com/1stG/organizations.svg)](https://opencollective.com/1stG) | [![RxTS Open Collective sponsors](https://opencollective.com/rxts/organizations.svg)](https://opencollective.com/rxts) | [![UnTS Open Collective sponsors](https://opencollective.com/unts/organizations.svg)](https://opencollective.com/unts) |

### Backers

| 1stG                                                                                                                | RxTS                                                                                                                | UnTS                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| [![1stG Open Collective backers](https://opencollective.com/1stG/individuals.svg)](https://opencollective.com/1stG) | [![RxTS Open Collective backers](https://opencollective.com/rxts/individuals.svg)](https://opencollective.com/rxts) | [![UnTS Open Collective backers](https://opencollective.com/unts/individuals.svg)](https://opencollective.com/unts) |

## Changelog

Detailed changes for each release are documented in [CHANGELOG.md](./CHANGELOG.md).

## License

[MIT][] © [JounQin][]@[1stG.me][]

[1stG.me]: https://www.1stG.me
[JounQin]: https://github.com/JounQin
[MIT]: http://opensource.org/licenses/MIT
