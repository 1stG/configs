# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.10.6](https://github.com/1stG/configs/compare/@1stg/rollup-config@0.10.5...@1stg/rollup-config@0.10.6) (2019-09-28)


### Bug Fixes

* **rollup-config:** add debug support ([a6489bd](https://github.com/1stG/configs/commit/a6489bd))





## [0.10.5](https://github.com/1stG/configs/compare/@1stg/rollup-config@0.10.4...@1stg/rollup-config@0.10.5) (2019-09-26)


### Bug Fixes

* **deps:** bump dependencies, add tslint-config/eslint, disable no-namespace for .d.ts ([8b340e8](https://github.com/1stG/configs/commit/8b340e8))





## [0.10.4](https://github.com/1stG/configs/compare/@1stg/rollup-config@0.10.3...@1stg/rollup-config@0.10.4) (2019-09-24)


### Bug Fixes

* **rollup-config:** should use package name instead of directory name to generate umd globals~ ([a17bb02](https://github.com/1stG/configs/commit/a17bb02))





## [0.10.3](https://github.com/1stG/configs/compare/@1stg/rollup-config@0.10.2...@1stg/rollup-config@0.10.3) (2019-09-24)


### Bug Fixes

* **rollup-config:** should use JSON.parse, fix incorrect getGlobals usage ([8e5b267](https://github.com/1stG/configs/commit/8e5b267))





## [0.10.2](https://github.com/1stG/configs/compare/@1stg/rollup-config@0.10.1...@1stg/rollup-config@0.10.2) (2019-09-24)


### Bug Fixes

* **rollup-config:** change external to function - rollup/rollup[#3129](https://github.com/1stG/configs/issues/3129) ([4eb7acd](https://github.com/1stG/configs/commit/4eb7acd))





## [0.10.1](https://github.com/1stG/configs/compare/@1stg/rollup-config@0.10.0...@1stg/rollup-config@0.10.1) (2019-09-24)


### Bug Fixes

* **rollup-config:** upgrade @pkgr/names-exports to 0.2.0 which supports prettier better ([0b6d251](https://github.com/1stG/configs/commit/0b6d251))





# [0.10.0](https://github.com/1stG/configs/compare/@1stg/rollup-config@0.9.7...@1stg/rollup-config@0.10.0) (2019-09-24)


### Features

* enable @pkgr/named-exports and prettier-plugin-pkg ([f7b1bc6](https://github.com/1stG/configs/commit/f7b1bc6))





## [0.9.7](https://github.com/1stG/configs/compare/@1stg/rollup-config@0.9.6...@1stg/rollup-config@0.9.7) (2019-09-24)


### Bug Fixes

* **rollup-config:** never set outDir to empty string automatically ([5682862](https://github.com/1stG/configs/commit/5682862))





## [0.9.6](https://github.com/1stG/configs/compare/@1stg/rollup-config@0.9.5...@1stg/rollup-config@0.9.6) (2019-09-23)


### Bug Fixes

* **rollup-config:** -ex is not working, so change to -x ([d39b124](https://github.com/1stG/configs/commit/d39b124))





## 0.9.5 (2019-09-21)


### Bug Fixes

* **rollup-config:** regression of input and outputDir which should always be scoped ([f2fcc15](https://github.com/1stG/configs/commit/f2fcc15))





## [0.9.4](https://github.com/1stG/configs/compare/@1stg/rollup-config@0.9.3...@1stg/rollup-config@0.9.4) (2019-09-13)


### Bug Fixes

* **deps:** bump dep versions, support directory option of ts resolver ([0c6bcf1](https://github.com/1stG/configs/commit/0c6bcf1))





## [0.9.3](https://github.com/1stG/configs/compare/@1stg/rollup-config@0.9.2...@1stg/rollup-config@0.9.3) (2019-09-10)


### Bug Fixes

* **rollup:** prod option should be optional ([cc4cd26](https://github.com/1stG/configs/commit/cc4cd26))





## [0.9.2](https://github.com/1stG/configs/compare/@1stg/rollup-config@0.9.1...@1stg/rollup-config@0.9.2) (2019-09-10)


### Bug Fixes

* **deps:** enable eslint-import-resolver-ts, add prod option for rollup ([3471316](https://github.com/1stG/configs/commit/3471316))





## [0.9.1](https://github.com/1stG/configs/compare/@1stg/rollup-config@0.9.0...@1stg/rollup-config@0.9.1) (2019-09-10)


### Bug Fixes

* **rollup:** .js suffix could be be omitted ([95c2aa7](https://github.com/1stG/configs/commit/95c2aa7))





# [0.9.0](https://github.com/1stG/configs/compare/@1stg/rollup-config@0.8.0...@1stg/rollup-config@0.9.0) (2019-09-10)


### Features

* **rollup:** add cli support to simplify usage ([dfb7ef7](https://github.com/1stG/configs/commit/dfb7ef7))





# [0.8.0](https://github.com/1stG/configs/compare/@1stg/rollup-config@0.7.0...@1stg/rollup-config@0.8.0) (2019-09-09)


### Features

* **rollup:** detect available extensions automatically ([e0deecf](https://github.com/1stG/configs/commit/e0deecf))
* **rollup:** enable rollup-plugin-replace for production build ([542f081](https://github.com/1stG/configs/commit/542f081))





# [0.7.0](https://github.com/1stG/configs/compare/@1stg/rollup-config@0.6.0...@1stg/rollup-config@0.7.0) (2019-09-07)


### Features

* **rollup:** do not include umd for engines.node by default ([5a6c919](https://github.com/1stG/configs/commit/5a6c919))





# [0.6.0](https://github.com/1stG/configs/compare/@1stg/rollup-config@0.5.1...@1stg/rollup-config@0.6.0) (2019-09-07)


### Features

* **rollup:** mark builtin-modules as external for engines.node ([8f50586](https://github.com/1stG/configs/commit/8f50586))
* **rollup:** support mark dependencies as external for engines.node ([a3fa2de](https://github.com/1stG/configs/commit/a3fa2de))





## [0.5.1](https://github.com/1stG/configs/compare/@1stg/rollup-config@0.5.0...@1stg/rollup-config@0.5.1) (2019-09-07)


### Bug Fixes

* support hanle scoped package umd global name automatically ([da47f7c](https://github.com/1stG/configs/commit/da47f7c))





# [0.5.0](https://github.com/1stG/configs/compare/@1stg/rollup-config@0.4.1...@1stg/rollup-config@0.5.0) (2019-09-07)


### Features

* **rollup:** add rollup-plugin-json support ([e060062](https://github.com/1stG/configs/commit/e060062))





## [0.4.1](https://github.com/1stG/configs/compare/@1stg/rollup-config@0.4.0...@1stg/rollup-config@0.4.1) (2019-09-07)


### Bug Fixes

* **rollup:** incorrect default input extension ([493e6fd](https://github.com/1stG/configs/commit/493e6fd))





# [0.4.0](https://github.com/1stG/configs/compare/@1stg/rollup-config@0.3.0...@1stg/rollup-config@0.4.0) (2019-09-05)


### Features

* enable eslint-plugin-node, more plugins for rollup ([abfa39b](https://github.com/1stG/configs/commit/abfa39b))





# [0.3.0](https://github.com/1stG/configs/compare/@1stg/rollup-config@0.2.2...@1stg/rollup-config@0.3.0) (2019-09-02)


### Features

* **rollup:** support output es version bundle by default ([0a4d2fb](https://github.com/1stG/configs/commit/0a4d2fb))





## [0.2.2](https://github.com/1stG/configs/compare/@1stg/rollup-config@0.2.1...@1stg/rollup-config@0.2.2) (2019-09-01)


### Bug Fixes

* **rollup:** should use `upperFirst` instead of `startCase` ([bce4b00](https://github.com/1stG/configs/commit/bce4b00))





## [0.2.1](https://github.com/1stG/configs/compare/@1stg/rollup-config@0.2.0...@1stg/rollup-config@0.2.1) (2019-09-01)


### Bug Fixes

* **rollup:** fallback umd name for non-monorepo package ([04aa9ac](https://github.com/1stG/configs/commit/04aa9ac))





# 0.2.0 (2019-09-01)


### Features

* add rollup config, improve eslint and ts configs ([c3523bb](https://github.com/1stG/configs/commit/c3523bb))
