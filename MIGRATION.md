# Migration guide

This major release turns every config package into a `defineConfig(options)`
factory with a deterministic default, moves linting/formatting to Oxlint and
Oxfmt, and compiles the packages from TypeScript into `lib/`.

The packages are ESM only and require Node `^22.18.0 || >=24.11.0`.

## Removed packages

| Package                 | Replacement                                                                                             |
| ----------------------- | ------------------------------------------------------------------------------------------------------- |
| `@1stg/eslint-config`   | `@1stg/oxlint-config`; see [its guide](./packages/oxlint-config/MIGRATION.md).                          |
| `@1stg/babel-preset`    | None. Use your bundler or `tsc` directly.                                                               |
| `@1stg/prettier-config` | **Not removed.** Plugins are resolved lazily; see [its guide](./packages/prettier-config/MIGRATION.md). |

## Per-package guides

- [`@1stg/commitlint-config`](./packages/commitlint-config/MIGRATION.md)
- [`@1stg/markuplint-config`](./packages/markuplint-config/MIGRATION.md)
- [`@1stg/nano-staged`](./packages/nano-staged/MIGRATION.md)
- [`@1stg/postcss-config`](./packages/postcss-config/MIGRATION.md)
- [`@1stg/prettier-config`](./packages/prettier-config/MIGRATION.md)
- [`@1stg/simple-git-hooks`](./packages/simple-git-hooks/MIGRATION.md)
- [`@1stg/stylelint-config`](./packages/stylelint-config/MIGRATION.md)
- [`@1stg/browserslist-config`](./packages/browserslist-config/MIGRATION.md)
- [`@1stg/oxlint-config`](./packages/oxlint-config/MIGRATION.md)
- [`@1stg/oxfmt-config`](./packages/oxfmt-config/MIGRATION.md)
- [`@1stg/common-config`](./packages/common-config/MIGRATION.md)
- [`@1stg/app-config`](./packages/app-config/MIGRATION.md)
- [`@1stg/config`](./packages/config/MIGRATION.md)
- [`@1stg/remark-preset`](./packages/remark-preset/MIGRATION.md)
- [`@1stg/tsconfig`](./packages/tsconfig/MIGRATION.md)
