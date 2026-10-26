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

## Options

| Option      | Default | Description                                    |
| ----------- | ------- | ---------------------------------------------- |
| `modules`   | `false` | Ignore the CSS Modules pseudo classes.         |
| `prettier`  | `false` | Run Prettier as a Stylelint rule.              |
| `scss`      | `false` | Add the SCSS syntax and rules.                 |
| `scssLoose` | `false` | Add the SCSS syntax with the strict rules off. |
| `vue`       | `false` | Ignore Vue-specific pseudo elements.           |

`stylelint-prettier` is opt-in now; the config no longer decides based on
whether `eslint` happens to be installed.

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
