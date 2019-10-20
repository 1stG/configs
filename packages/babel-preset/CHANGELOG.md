# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.7.9](https://github.com/1stG/configs/compare/@1stg/babel-preset@0.7.8...@1stg/babel-preset@0.7.9) (2019-10-20)


### Bug Fixes

* a lot of tiny improvements ([06fb545](https://github.com/1stG/configs/commit/06fb545d9687e6da47b3e367bdb1b89553fc3c86))





## [0.7.8](https://github.com/1stG/configs/compare/@1stg/babel-preset@0.7.7...@1stg/babel-preset@0.7.8) (2019-10-11)


### Bug Fixes

* **babel-preset:** support isTSX option and enable for vue by default ([1b762dd](https://github.com/1stG/configs/commit/1b762dd))





## [0.7.7](https://github.com/1stG/configs/compare/@1stg/babel-preset@0.7.6...@1stg/babel-preset@0.7.7) (2019-10-09)


### Bug Fixes

* **babel-preset:** shoud provide default options for class properties and decorators ([cdd686a](https://github.com/1stG/configs/commit/cdd686a))





## [0.7.6](https://github.com/1stG/configs/compare/@1stg/babel-preset@0.7.5...@1stg/babel-preset@0.7.6) (2019-10-09)


### Bug Fixes

* **babel-preset:** add missing class-properties for .tsx? ([0c949f2](https://github.com/1stG/configs/commit/0c949f2))





## [0.7.5](https://github.com/1stG/configs/compare/@1stg/babel-preset@0.7.4...@1stg/babel-preset@0.7.5) (2019-10-09)


### Bug Fixes

* **babel-preset:** enable decorators plugin, and override correctly for .tsx? ([4cc7efd](https://github.com/1stG/configs/commit/4cc7efd))





## [0.7.4](https://github.com/1stG/configs/compare/@1stg/babel-preset@0.7.3...@1stg/babel-preset@0.7.4) (2019-10-05)


### Bug Fixes

* **babel-preset:** enable remove-console on production except error and warn ([cbd95c9](https://github.com/1stG/configs/commit/cbd95c9))





## [0.7.3](https://github.com/1stG/configs/compare/@1stg/babel-preset@0.7.2...@1stg/babel-preset@0.7.3) (2019-10-03)


### Bug Fixes

* **babel-preset:** detect react-hot-loader and enable it automatically ([795a2fe](https://github.com/1stG/configs/commit/795a2fe))





## [0.7.2](https://github.com/1stG/configs/compare/@1stg/babel-preset@0.7.1...@1stg/babel-preset@0.7.2) (2019-10-01)


### Bug Fixes

* **babel-preset:** add babel-plugin-import support with builtin antd support ([2854921](https://github.com/1stG/configs/commit/2854921))





## 0.7.1 (2019-09-30)


### Bug Fixes

* **babel-preset:** class-properties is still proposal and required, which has not been shipped in preset-env ([e3995bc](https://github.com/1stG/configs/commit/e3995bc))





# [0.7.0](https://github.com/1stG/configs/compare/@1stg/babel-preset@0.6.2...@1stg/babel-preset@0.7.0) (2019-09-18)


### Features

* **babel-preset:** prefer fast-async over generator ([ef2d2f9](https://github.com/1stG/configs/commit/ef2d2f9))





## [0.6.2](https://github.com/1stG/configs/compare/@1stg/babel-preset@0.6.1...@1stg/babel-preset@0.6.2) (2019-09-13)


### Bug Fixes

* **deps:** bump dep versions, support directory option of ts resolver ([0c6bcf1](https://github.com/1stG/configs/commit/0c6bcf1))





## [0.6.1](https://github.com/1stG/configs/compare/@1stg/babel-preset@0.6.0...@1stg/babel-preset@0.6.1) (2019-09-10)


### Bug Fixes

* **deps:** enable eslint-import-resolver-ts, add prod option for rollup ([3471316](https://github.com/1stG/configs/commit/3471316))





# [0.6.0](https://github.com/1stG/configs/compare/@1stg/babel-preset@0.5.0...@1stg/babel-preset@0.6.0) (2019-09-05)


### Features

* enable eslint-plugin-node, more plugins for rollup ([abfa39b](https://github.com/1stG/configs/commit/abfa39b))





# 0.5.0 (2019-09-01)


### Bug Fixes

* do not transform ts automatically, consider jsx as react by default ([cad8559](https://github.com/1stG/configs/commit/cad8559))
* enable jsx plugin for vue and mdx automatically ([42608c8](https://github.com/1stG/configs/commit/42608c8))


### Features

* add support of @vue/babel-preset-jsx ([cf9670f](https://github.com/1stG/configs/commit/cf9670f))
* first blood, should just work ([f925e8e](https://github.com/1stG/configs/commit/f925e8e))
* improve babel-preset and eslint-config usage ([4884606](https://github.com/1stG/configs/commit/4884606))
* upgrade eslint/stylelint-scss, consider mdx content as jsx ([032e9bf](https://github.com/1stG/configs/commit/032e9bf))
