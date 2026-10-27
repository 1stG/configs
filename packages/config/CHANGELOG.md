# @1stg/config

## 1.2.2

### Patch Changes

- [#415](https://github.com/1stG/configs/pull/415) [`a0276d4`](https://github.com/1stG/configs/commit/a0276d4bc5f6cbac18c01ee90945631375e0f851) Thanks [@JounQin](https://github.com/JounQin)! - feat!: defineConfig-based configs, Oxlint/Oxfmt and a thin ESLint
  
  Every remaining config package now exports a `defineConfig(options)` factory
  alongside the zero-config default. Options are explicit: the configs no longer
  rely on ambient `CI`, `NODE_ENV`, `cwd` or git state; defaults may detect the
  project structure or installed optional peers when `defineConfig()` is called.
  Options extend the native config types (`OxfmtConfig`, `OxlintConfig`,
  `prettier.Config`, `stylelint.Config`, `postcss.ProcessOptions`, ...), so
  tool-specific fields pass through without being re-declared.
  
  - `@1stg/eslint-config` now only covers the file types Oxlint cannot parse
    (Markdown/JSON/YAML/TOML) and uses `eslint-plugin-oxlint` to avoid duplicate
    reports; Markdown/JSON(C) and `eslint-plugin-oxlint` are installed by default,
    YAML/TOML are optional peers, and `eslint-plugin-markup` can lint HTML on
    Node >= 24 when installed.
    `@1stg/babel-preset` is removed and JS/TS/Vue parsing moves to
    [`@1stg/oxlint-config`](../packages/oxlint-config).
  - New [`@1stg/oxlint-config`](../packages/oxlint-config) (Oxlint) and
    [`@1stg/oxfmt-config`](../packages/oxfmt-config) (Oxfmt). Framework plugins are
    enabled when the framework is installed; formatting is no longer an ESLint
    rule by default.
  - `@1stg/prettier-config` is kept for the languages Oxfmt cannot format (Pug,
    Ruby, shell, INI, properties, Stylus, Sass). Its plugins are optional peer
    dependencies (discovered from this package's `dependencies` + optional
    `peerDependencies`), with `prettier-plugin-pkg` installed by default; the
    `/next` (`babel-ts`) variant is gone with Babel.
  - `@1stg/nano-staged` takes `formatter` (`'oxfmt' | 'prettier' | 'both'`),
    `linter` (`'oxlint' | 'eslint'`) and `typecheck` options instead of
    per-framework entry points (`/tsc`, `/ngc`, `/vue-tsc`). Linter, stylelint,
    type-coverage and imagemin are auto-detected from installed packages.
  - `@1stg/stylelint-config` takes `scss`, `scssLoose`, `modules` and `prettier`
    options; `stylelint-prettier` is an optional peer enabled when installed, and
    `vue` is enabled when `vue` is installed.
  - `@1stg/markuplint-config` takes `vue` instead of the `/angular` and `/vue`
    subpaths. Angular support is dropped, including the `@1stg/tsconfig/angular`
    and `ng-lib` presets.
  - `@1stg/commitlint-config` takes `monorepo` (defaulting to `isMonorepo()`);
    `@1stg/simple-git-hooks` takes `runner` and only emits hooks for installed
    `nano-staged`/`@commitlint/cli`.
  - `@1stg/postcss-config` is ESM only (use `postcss.config.js`), minifies based
    on its `env` option rather than a module-level `NODE_ENV` snapshot, and extends
    `postcss.ProcessOptions`; accepts `minify`, `map`, `cssnano`, `presetOptions`
    and extra `plugins`.
  - All packages are authored in TypeScript and built with `tsc -b` into `lib/`;
    declarations are generated, the hand-written `.d.ts` files are gone, and
    `yarn build` runs on install and release.
  - All packages publish explicit `exports.types`, a `files` allow-list, and
    consistent Node.js engines.
  - `@1stg/browserslist-config` is ESM only (browserslist >= 4.24.5) and drops
    the `alauda` and `alauda-legacy` presets.

## 1.2.1

### Patch Changes

- [#386](https://github.com/1stG/configs/pull/386) [`97cedcc`](https://github.com/1stG/configs/commit/97cedcc8d57f2d4bf69fd3c4ebc8896c834cd960) Thanks [@JounQin](https://github.com/JounQin)! - fix: `PRETTIER_EXPERIMENTAL_CLI` env is already supported by prettier itself

## 1.2.0

### Minor Changes

- [#385](https://github.com/1stG/configs/pull/385) [`a7ee3ee`](https://github.com/1stG/configs/commit/a7ee3ee619abbd070a2c9f5e29346af6fab1b3a8) Thanks [@JounQin](https://github.com/JounQin)! - feat: enable `--experimental-cli` for `PRETTIER_EXPERIMENTAL_CLI` env

## 1.1.0

### Minor Changes

- [#377](https://github.com/1stG/configs/pull/377) [`ed8b7e5`](https://github.com/1stG/configs/commit/ed8b7e56fedf3c99b99b64631d675f67a7265825) Thanks [@JounQin](https://github.com/JounQin)! - feat: enable `eslint-plugin-node-dependencies` conditionally

## 1.0.5

### Patch Changes

- [#343](https://github.com/1stG/configs/pull/343) [`ad28a13`](https://github.com/1stG/configs/commit/ad28a1398b427b4e5253ab65b1136a3b5d997f7e) Thanks [@JounQin](https://github.com/JounQin)! - fix: add missing `homepage` field

## 1.0.4

### Patch Changes

- [#336](https://github.com/1stG/configs/pull/336) [`fa39ecf`](https://github.com/1stG/configs/commit/fa39ecf3bc7982e7e4172952721f8745991f4739) Thanks [@JounQin](https://github.com/JounQin)! - chore: bump all (dev) deps

## 1.0.3

### Patch Changes

- [#329](https://github.com/1stG/configs/pull/329) [`c08b298`](https://github.com/1stG/configs/commit/c08b2989d7e3765dd3853fe5461d9662e5b3a05e) Thanks [@JounQin](https://github.com/JounQin)! - chore: housekeeping, bump all (dev) deps

## 1.0.2

### Patch Changes

- [#325](https://github.com/1stG/configs/pull/325) [`cf9c358`](https://github.com/1stG/configs/commit/cf9c358e875667944a35be9dcb9a99d70df8de32) Thanks [@JounQin](https://github.com/JounQin)! - fix(eslint-config): enable `curly` correctly due to `config-prettier`

## 1.0.1

### Patch Changes

- [#309](https://github.com/1stG/configs/pull/309) [`5dbb419`](https://github.com/1stG/configs/commit/5dbb41960ecca8d1000b006914d37424797e4946) Thanks [@JounQin](https://github.com/JounQin)! - chore(eslint-config): enable `destructuring: all` for `prefer-const`

  chore: bump all deps

## 1.0.0

### Major Changes

- [#284](https://github.com/1stG/configs/pull/284) [`db3b78b`](https://github.com/1stG/configs/commit/db3b78b29159200362727141931016fcd6a85846) Thanks [@JounQin](https://github.com/JounQin)! - chore: bump all (dev) deps

## 0.2.2

### Patch Changes

- [#223](https://github.com/1stG/configs/pull/223) [`83fc35c`](https://github.com/1stG/configs/commit/83fc35cace2fa1d8ecd7737de5660694df0b381f) Thanks [@JounQin](https://github.com/JounQin)! - fix: `.yarnrc` is actually not ini

## 0.2.1

### Patch Changes

- [#164](https://github.com/1stG/configs/pull/164) [`990677b`](https://github.com/1stG/configs/commit/990677ba11d36dcbd1725b395f27384b1746c9f4) Thanks [@JounQin](https://github.com/JounQin)! - chore: bump all (dev)Dependencies

## 0.2.0

### Minor Changes

- [#128](https://github.com/1stG/configs/pull/128) [`7228ebb`](https://github.com/1stG/configs/commit/7228ebb1d2a31b5a305258dff24b0d0ca357ad4f) Thanks [@JounQin](https://github.com/JounQin)! - feat: support `CONFIG_PREFER_PRETTIER` env

## 0.1.0

### Minor Changes

- [#124](https://github.com/1stG/configs/pull/124) [`8aa8066`](https://github.com/1stG/configs/commit/8aa8066a926a3fd972a051bbbce11fab4cd35896) Thanks [@JounQin](https://github.com/JounQin)! - feat(prettier): add `prettier-plugin-ini` support

- [#121](https://github.com/1stG/configs/pull/121) [`e23439a`](https://github.com/1stG/configs/commit/e23439a4691c6a49f6413ccfcda281c5f77dc85c) Thanks [@JounQin](https://github.com/JounQin)! - feat: add @1stg/config for sharing configs

### Patch Changes

- [#123](https://github.com/1stG/configs/pull/123) [`4f70fd3`](https://github.com/1stG/configs/commit/4f70fd3aeff6b1b66ccb607fcb61f59977d773c1) Thanks [@JounQin](https://github.com/JounQin)! - docs: add README files
