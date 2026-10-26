# Migrating `@1stg/common-config`

The meta package now depends on `@1stg/oxlint-config`,
`@1stg/oxfmt-config` and `@1stg/prettier-config`; its dependencies no longer
include ESLint or Babel.

If you used `@1stg/common-config` to get ESLint, migrate to
`@1stg/oxlint-config`. The Prettier config remains available and resolves its
plugins lazily.
