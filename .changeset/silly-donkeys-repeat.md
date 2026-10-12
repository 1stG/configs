---
"@1stg/eslint-config": minor
"@1stg/markuplint-config": major
"@1stg/nano-staged": patch
"@1stg/postcss-config": minor
"@1stg/prettier-config": minor
"@1stg/stylelint-config": minor
---

chore(deps): bump all dependencies

- `@1stg/markuplint-config` now requires `markuplint@^5` and ships
  `@markuplint/vue-parser`/`@markuplint/vue-spec` v5.
- `@1stg/eslint-config`, `@1stg/postcss-config`, `@1stg/prettier-config` and
  `@1stg/stylelint-config` bump their parser/plugin majors:
  `eslint-plugin-simple-import-sort@14`, `cssnano@9` with `postcss-import@17`,
  `prettier-plugin-toml@3` with `prettier-plugin-sh@0.20`, and `postcss-html@2`
  with `postcss-markdown@2`.
- `@1stg/nano-staged` now requires `prettier@^3.9.10`, which the workspace
  resolves through a single `resolutions`-free `prettier` entry.
- Releases are published with [npm provenance][]: `changeset publish` shells out
  to `yarn npm publish`, which now runs with `npmPublishProvenance: true` and
  the `id-token: write` permission the release workflow already grants.

[npm provenance]: https://docs.npmjs.com/generating-provenance-statements
