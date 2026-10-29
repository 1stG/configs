# @1stg/stylelint-config

Personal but Shareable Stylelint Configuration for all 1stG.me projects.

## Usage

`stylelint.config.js`:

```js
import { defineConfig } from '@1stg/stylelint-config'

export default defineConfig({
  modules: true,
  scss: true,
})
```

The default export is the zero-config version, usable from a JSON config:

```json
{ "extends": ["@1stg/stylelint-config"] }
```

The default export can be re-exported directly:

```js
export { default } from '@1stg/stylelint-config'
```

Use `defineConfig` only when you need options.

## Options

| Option      | Default   | Description                                          |
| ----------- | --------- | ---------------------------------------------------- |
| `modules`   | `false`   | Ignore the CSS Modules pseudo classes.               |
| `prettier`  | installed | Run Prettier when `stylelint-prettier` is installed. |
| `scss`      | `false`   | Add the SCSS syntax and rules.                       |
| `scssLoose` | `false`   | Add the SCSS syntax with the strict rules off.       |
| `vue`       | installed | Ignore Vue pseudo elements when `vue` is installed.  |

`stylelint-prettier` is enabled when it is installed (it is an optional peer);
the config no longer decides based on whether `eslint` is installed.

## Optional peers

The syntax and plugin packages are optional peers, installed only when their
file type/feature is used:

- `postcss-html`, `postcss-less`, `postcss-markdown`, `postcss-scss` for the
  corresponding custom syntaxes;
- `stylelint-scss` when enabling `scss`/`scssLoose`;
- `stylelint-high-performance-animation` and
  `stylelint-no-unsupported-browser-features` for their plugin rules;
- `stylelint-prettier` for Prettier integration.

When the performance/browser plugins are not installed, their rules are
skipped. `stylelint` and `prettier` remain required peers.

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
