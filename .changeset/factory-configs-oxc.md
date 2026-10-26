---
'@1stg/browserslist-config': major
'@1stg/commitlint-config': major
'@1stg/markuplint-config': major
'@1stg/nano-staged': major
'@1stg/postcss-config': major
'@1stg/simple-git-hooks': major
'@1stg/stylelint-config': major
---

feat!: factory-based configs, Oxlint and Oxfmt, drop Babel and ESLint

Every remaining config package now exports a `defineConfig(options)` factory
alongside the zero-config default. Options are explicit: the configs no longer
inspect the consumer's `node_modules`, `CI`, `NODE_ENV`, `cwd` or git state at
module load time, so the same config produces the same result locally and on CI.

- `@1stg/eslint-config` and `@1stg/babel-preset` are removed. Use
  [`@1stg/oxlint-config`](../oxlint-config) instead; JavaScript/TypeScript
  parsing no longer goes through `@babel/eslint-parser`.
- New [`@1stg/oxlint-config`](../oxlint-config) (Oxlint) and
  [`@1stg/oxfmt-config`](../oxfmt-config) (Oxfmt). Formatting is no longer an
  ESLint rule by default; `prettier: 'eslint'` remains available as an option.
- `@1stg/prettier-config` is removed. This repository keeps a local Prettier
  config with plugins for the languages Oxfmt cannot format (Pug, Ruby, shell,
  INI, properties, Stylus, Sass); consumers configure Prettier themselves.
- `@1stg/nano-staged` takes `formatter` (`'oxfmt' | 'prettier' | 'both'`),
  `linter` (`'oxlint' | 'eslint'`) and `typecheck` options instead of
  per-framework entry points (`/tsc`, `/ngc`, `/vue-tsc`).
- `@1stg/stylelint-config` takes `scss`, `scssLoose`, `modules` and `prettier`
  options; `stylelint-prettier` and the SCSS rules are opt-in now, and the
  config no longer flips rules based on whether `eslint` is installed.
- `@1stg/markuplint-config` takes `vue` instead of the `/angular` and `/vue`
  subpaths. Angular support is dropped.
- `@1stg/commitlint-config` takes `monorepo` (defaulting to `isMonorepo()`); `@1stg/simple-git-hooks` takes `runner`.
- `@1stg/postcss-config` is ESM only (use `postcss.config.js`), minifies based
  on its `env` option rather than a module-level `NODE_ENV` snapshot, and accepts
  `minify`, `map`, `cssnano`, `presetOptions` and extra `plugins`.
- All packages are authored in TypeScript and built with `tsc -b` into `lib/`;
  declarations are generated, the hand-written `.d.ts` files are gone, and
  `yarn build` runs on install and release.
- All packages publish explicit `exports.types`, a `files` allow-list, and
  consistent Node.js engines.
- `@1stg/browserslist-config` drops the `alauda` and `alauda-legacy` presets.
