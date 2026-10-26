---
'@1stg/browserslist-config': major
'@1stg/tsconfig': major
'@1stg/eslint-config': major
'@1stg/prettier-config': major
'@1stg/commitlint-config': major
'@1stg/markuplint-config': major
'@1stg/nano-staged': major
'@1stg/postcss-config': major
'@1stg/simple-git-hooks': major
'@1stg/stylelint-config': major
---

feat!: defineConfig-based configs, Oxlint/Oxfmt and a thin ESLint

Every remaining config package now exports a `defineConfig(options)` factory
alongside the zero-config default. Options are explicit: the configs no longer
inspect the consumer's `node_modules`, `CI`, `NODE_ENV`, `cwd` or git state at
module load time, so the same config produces the same result locally and on CI.
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
