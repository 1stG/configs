---
'@1stg/markuplint-config': major
---

Move type-only `@markuplint/ml-config` to an optional peer dependency and make
the Vue parser/spec peers optional instead of hard dependencies.

TypeScript consumers must install `@markuplint/ml-config` for the public
`Config` types. Vue consumers must install `@markuplint/vue-parser` and
`@markuplint/vue-spec` in addition to enabling `vue: true`.
