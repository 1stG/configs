# @1stg/oxfmt-config

Personal but Shareable [Oxfmt](https://oxc.rs/docs/guide/usage/formatter) Configuration for all 1stG.me projects.

## Usage

```js
// oxfmt.config.ts
import { defineConfig } from '@1stg/oxfmt-config'

export default defineConfig({
  vue: true,
})
```

```sh
oxfmt .
```

The default export is the zero-config version, and can be referenced directly by
a `.oxfmtrc.json`-based setup or imported by a JS config.

## Options

| Option            | Default | Description                                                     |
| ----------------- | ------- | --------------------------------------------------------------- |
| `printWidth`      | `80`    | Line width (Oxfmt's own default is `100`).                      |
| `semi`            | `false` | Print semicolons.                                               |
| `singleQuote`     | `true`  | Use single quotes.                                              |
| `sortImports`     | `true`  | Sort imports and exports.                                       |
| `sortPackageJson` | `false` | Sort `package.json` keys; use `@1stg/prettier-config` for that. |
| `ignorePatterns`  | `[]`    | Gitignore-style patterns to skip.                               |
| `jsdoc`           | `false` | Format JSDoc comments.                                          |
| `overrides`       | `[]`    | File-specific overrides.                                        |

## Coverage

Oxfmt formats most languages natively and delegates HTML, Vue, Svelte, Astro,
MDX, Handlebars and MJML to its bundled Prettier. It does **not** support
Prettier plugins: for Pug, Ruby, shell, INI, properties and Stylus, configure
Prettier (and the matching plugins) in the project that still needs them.

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
