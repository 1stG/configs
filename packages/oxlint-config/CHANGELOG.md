# Changelog

## 1.1.0

### Minor Changes

- [#430](https://github.com/1stG/configs/pull/430) [`5643939`](https://github.com/1stG/configs/commit/5643939d348c5b70f4a883eacca8a26a18aef415) Thanks [@JounQin](https://github.com/JounQin)! - Enable the structural TypeScript-friendly `no-magic-numbers` defaults (array
  indexes, default values, type indexes and numeric literal types) plus
  `enforceConst`, curate the shared ignore list to common values, and expose all
  rule options through `noMagicNumbers`, whose `ignore` is merged with the
  shared list. `rules` overrides remain as-is. Named declarations (enums,
  readonly/class fields and default parameters) count as naming the number;
  `detectObjects` stays opt-in.

## 1.0.0

### Major Changes

- [#423](https://github.com/1stG/configs/pull/423) [`89733fb`](https://github.com/1stG/configs/commit/89733fbfa47f64ef1fb794d037f3a65a9836ee65) Thanks [@JounQin](https://github.com/JounQin)! - First public release of the Oxfmt and Oxlint configs.

### Minor Changes

- [#420](https://github.com/1stG/configs/pull/420) [`dde6235`](https://github.com/1stG/configs/commit/dde6235d72b2e72b8413adeab9069b585af1c849) Thanks [@JounQin](https://github.com/JounQin)! - Enable the remaining Oxlint-supported rules from the previous ESLint config,
  including `no-magic-numbers` with the historical ignore list, `no-fallthrough`,
  `no-redeclare`, `prefer-object-spread` and the other style/suspicious rules
  that the automatic migration audit found missing.

- [#421](https://github.com/1stG/configs/pull/421) [`e3b113d`](https://github.com/1stG/configs/commit/e3b113d17a63c9d8b85a7d955c6128a4c4cf08cd) Thanks [@JounQin](https://github.com/JounQin)! - Enable the type-aware `typescript/no-deprecated` rule, covering the
  `sonarjs/deprecation` behavior that needs TypeScript type information.

- [#425](https://github.com/1stG/configs/pull/425) [`c5dd9a7`](https://github.com/1stG/configs/commit/c5dd9a7fd420eebf7961c4a097bd69c9ba69fdda) Thanks [@JounQin](https://github.com/JounQin)! - Enable Oxlint's `perf` category as a warning and load the `react-perf` plugin
  when React is enabled. The repository currently reports no perf findings, but
  consumers get the suggestions without a hard failure.

- [#419](https://github.com/1stG/configs/pull/419) [`4915585`](https://github.com/1stG/configs/commit/491558590071181e30226c3d8d6d5dddae4a6900) Thanks [@JounQin](https://github.com/JounQin)! - Add a `typeAware` option that enables Oxlint's type-aware rules. It defaults
  to whether `oxlint-tsgolint` is installed and can be disabled explicitly.

## 1.0.0

- Initial release.
