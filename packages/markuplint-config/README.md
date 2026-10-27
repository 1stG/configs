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

The default export can be re-exported directly:

```js
export { default } from '@1stg/markuplint-config'
```

Use `defineConfig` only when you need options.

## Options

| Option | Default   | Description                                      |
| ------ | --------- | ------------------------------------------------ |
| `vue`  | installed | Add the Vue parser/spec when `vue` is installed. |

The base extends `markuplint:recommended`; the Vue `parser`/`specs` mapping is
kept on top of it, so `.vue` files do not fall back to the HTML parser.

`@markuplint/ml-config` is a required peer because the public types reference
its `Config`. The Vue `@markuplint/vue-parser` and `@markuplint/vue-spec` peers
are optional; install them when enabling `vue: true`.

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
