---
"@1stg/markuplint-config": major
"@1stg/postcss-config": major
---

feat!: align the declared Node.js engines with the dependencies

- `@1stg/markuplint-config` now requires Node.js `>=24.0.0`, as
  `markuplint@5` and `@markuplint/vue-parser`/`@markuplint/vue-spec@5` do.
- `@1stg/postcss-config` now requires Node.js
  `^22.22.3 || ^24.15.0 || >=26.0.0`, as `cssnano@9` does.
