# @1stg/nano-staged

Personal but Shareable [nano-staged](https://npmjs.com/package/nano-staged)
Configuration for all 1stG.me projects.

## Usage

`.nano-staged.js`:

```js
import { defineConfig } from '@1stg/nano-staged'

export default defineConfig({
  formatter: 'both',
  linter: 'oxlint',
  stylelint: true,
  typecheck: 'tsc',
})
```

## Options

| Option         | Default         | Description                                                                  |
| -------------- | --------------- | ---------------------------------------------------------------------------- |
| `formatter`    | `'prettier'`    | `'oxfmt'`, `'prettier'`, `'both'` (Oxfmt plus Prettier fallback) or `false`. |
| `linter`       | installed       | `'oxlint'` → `'eslint'` → `false` based on installation.                     |
| `stylelint`    | installed       | Run `stylelint --fix` when stylelint is installed.                           |
| `typecheck`    | `false`         | `'tsc'`, `'ngc'`, `'vue-tsc'` or `false`.                                    |
| `tsconfig`     | discovered      | Explicit `tsconfig` path, resolved once when the config loads.               |
| `typeCoverage` | installed       | Run `type-coverage` when installed.                                          |
| `imagemin`     | installed       | Optimize images with `i` when `@pkgr/imagemin` is installed.                 |
| `commands`     | `{}`            | Override a command, e.g. `{ oxlint: 'oxlint --type-aware --fix' }`.          |
| `cwd`          | `process.cwd()` | Base directory for `tsconfig` discovery.                                     |

`'both'` formats everything [Oxfmt](../oxfmt-config) supports and leaves the
languages that need Prettier plugins (Pug, Ruby, shell, INI, properties,
Stylus, Sass) to `prettier --write`.

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
