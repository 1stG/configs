# Change Log

## 1.0.0

### Major Changes

- [#399](https://github.com/1stG/configs/pull/399) [`15ea175`](https://github.com/1stG/configs/commit/15ea175c9ee05cf42db4c6c296c31f13207151c9) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): bump all dependencies, require Node.js `^22.18.0 || >=24.11.0`

  - Every configuration package now requires Node.js `^22.18.0 || >=24.11.0`,
    following Babel 8's own engines.
  - `@1stg/babel-preset` now requires `@babel/core@^8` and is ESM only, the
    removed `preset-env` `bugfixes`/`useBuiltIns`/`corejs` options are replaced by
    `babel-plugin-polyfill-corejs3`, and the decorators `legacy` /
    `decoratorsBeforeExport` options are replaced by Babel 8's `version`.
  - `babel-preset-proposal-typescript` v5 brings native Babel 8 support, so
    `@1stg/babel-preset` no longer needs the local `patch-package` patch nor the
    `resolutions` that forced its Babel 7 plugins onto Babel 8.
  - The `async` option was removed together with
    `babel-plugin-transform-async-to-promises` and `fast-async`, which are no
    longer maintained and do not work with Babel 8. async/await is now left to
    `@babel/preset-env`, so the configured targets keep native async/await
    instead of being rewritten to promise chains.
  - `typescript@7` (the native compiler) is installed as `@typescript/native`,
    while `typescript` aliases `@typescript/typescript6` for the JS API that the
    lint tool chain still requires.

### Patch Changes

- [#407](https://github.com/1stG/configs/pull/407) [`ad663dd`](https://github.com/1stG/configs/commit/ad663dd8c6044e61a2a501e159deef08b15fffda) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): bump all dependencies

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

- Updated dependencies [[`15ea175`](https://github.com/1stG/configs/commit/15ea175c9ee05cf42db4c6c296c31f13207151c9), [`ad663dd`](https://github.com/1stG/configs/commit/ad663dd8c6044e61a2a501e159deef08b15fffda)]:
  - @1stg/prettier-config@6.0.0

## 0.3.1

### Patch Changes

- Updated dependencies [[`3f70b26`](https://github.com/1stG/configs/commit/3f70b26ff7ee5a4373f430e589de713977cd93d3), [`3f70b26`](https://github.com/1stG/configs/commit/3f70b26ff7ee5a4373f430e589de713977cd93d3)]:
  - @1stg/prettier-config@5.4.0
  - @1stg/tsconfig@4.0.0

## 0.3.0

### Minor Changes

- [#388](https://github.com/1stG/configs/pull/388) [`5343736`](https://github.com/1stG/configs/commit/5343736c57e355ca26002562d61f1646691a65eb) Thanks [@JounQin](https://github.com/JounQin)! - fix: clarify correct engines field due to `1stg/prettier-config`

### Patch Changes

- [#386](https://github.com/1stG/configs/pull/386) [`97cedcc`](https://github.com/1stG/configs/commit/97cedcc8d57f2d4bf69fd3c4ebc8896c834cd960) Thanks [@JounQin](https://github.com/JounQin)! - fix: `PRETTIER_EXPERIMENTAL_CLI` env is already supported by prettier itself

- Updated dependencies [[`97cedcc`](https://github.com/1stG/configs/commit/97cedcc8d57f2d4bf69fd3c4ebc8896c834cd960), [`97cedcc`](https://github.com/1stG/configs/commit/97cedcc8d57f2d4bf69fd3c4ebc8896c834cd960)]:
  - @1stg/config@1.2.1
  - @1stg/prettier-config@5.3.1

## 0.2.1

### Patch Changes

- [#385](https://github.com/1stG/configs/pull/385) [`a7ee3ee`](https://github.com/1stG/configs/commit/a7ee3ee619abbd070a2c9f5e29346af6fab1b3a8) Thanks [@JounQin](https://github.com/JounQin)! - feat: enable `--experimental-cli` for `PRETTIER_EXPERIMENTAL_CLI` env

- Updated dependencies [[`4c2cbd7`](https://github.com/1stG/configs/commit/4c2cbd7ee4b5ef548d6ad9a265a1c42c68300e09), [`a7ee3ee`](https://github.com/1stG/configs/commit/a7ee3ee619abbd070a2c9f5e29346af6fab1b3a8)]:
  - @1stg/prettier-config@5.3.0
  - @1stg/config@1.2.0

## 0.2.0

### Minor Changes

- [#377](https://github.com/1stG/configs/pull/377) [`ed8b7e5`](https://github.com/1stG/configs/commit/ed8b7e56fedf3c99b99b64631d675f67a7265825) Thanks [@JounQin](https://github.com/JounQin)! - chore(deps): bump `@pkgr/core` and `@pkgr/utils`

### Patch Changes

- [#377](https://github.com/1stG/configs/pull/377) [`ed8b7e5`](https://github.com/1stG/configs/commit/ed8b7e56fedf3c99b99b64631d675f67a7265825) Thanks [@JounQin](https://github.com/JounQin)! - fix: declare node engines range correctly

- Updated dependencies [[`ed8b7e5`](https://github.com/1stG/configs/commit/ed8b7e56fedf3c99b99b64631d675f67a7265825), [`ed8b7e5`](https://github.com/1stG/configs/commit/ed8b7e56fedf3c99b99b64631d675f67a7265825)]:
  - @1stg/config@1.1.0
  - @1stg/prettier-config@5.2.1

## 0.1.2

### Patch Changes

- [#374](https://github.com/1stG/configs/pull/374) [`3db17fe`](https://github.com/1stG/configs/commit/3db17fe093c269b81f499f6268a3374b9f95599b) Thanks [@JounQin](https://github.com/JounQin)! - fix: consider `project` for `type-coverage` cli

## 0.1.1

### Patch Changes

- [#343](https://github.com/1stG/configs/pull/343) [`ad28a13`](https://github.com/1stG/configs/commit/ad28a1398b427b4e5253ab65b1136a3b5d997f7e) Thanks [@JounQin](https://github.com/JounQin)! - fix: add missing `homepage` field

- Updated dependencies [[`ad28a13`](https://github.com/1stG/configs/commit/ad28a1398b427b4e5253ab65b1136a3b5d997f7e)]:
  - @1stg/prettier-config@5.1.1
  - @1stg/tsconfig@3.0.3
  - @1stg/config@1.0.5

## 0.1.0

### Minor Changes

- [#342](https://github.com/1stG/configs/pull/342) [`3945e4f`](https://github.com/1stG/configs/commit/3945e4f50d66b753c902f975ae2f2313fd59f759) Thanks [@JounQin](https://github.com/JounQin)! - feat!: migrate from `lint-staged` to `nano-staged`

### Patch Changes

- Updated dependencies [[`4a1925b`](https://github.com/1stG/configs/commit/4a1925be85ab232216d5f83a0f85a8227e2f6b80)]:
  - @1stg/prettier-config@5.1.0
