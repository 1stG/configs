# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.14.2](https://github.com/1stG/configs/compare/@1stg/eslint-config@0.14.1...@1stg/eslint-config@0.14.2) (2019-11-01)


### Bug Fixes

* **eslint-config:** remove isSrcDirAvailable from resolvePaths ([aa218d2](https://github.com/1stG/configs/commit/aa218d28bf2fa0a309fab12656e05615c1c764d8))





## [0.14.1](https://github.com/1stG/configs/compare/@1stg/eslint-config@0.14.0...@1stg/eslint-config@0.14.1) (2019-11-01)


### Bug Fixes

* **eslint-config:** remove isSrcAppDirAvailable which seems useless ([7906321](https://github.com/1stG/configs/commit/7906321ed3605a833c4cd4a10b0fdca69ad14bd3))





# [0.14.0](https://github.com/1stG/configs/compare/@1stg/eslint-config@0.13.6...@1stg/eslint-config@0.14.0) (2019-10-31)


### Features

* enable sonar for eslint/tslint, refactor dependencies declaration ([a27422f](https://github.com/1stG/configs/commit/a27422fa05e87f5d3800ca63a4c7ef3ba052b715))





## [0.13.6](https://github.com/1stG/configs/compare/@1stg/eslint-config@0.13.5...@1stg/eslint-config@0.13.6) (2019-10-30)


### Bug Fixes

* **eslint-config:** enable import/external-module-folders option ([8e89e14](https://github.com/1stG/configs/commit/8e89e14ca69213fc84b91936705520e20fe6e5f5))





## [0.13.5](https://github.com/1stG/configs/compare/@1stg/eslint-config@0.13.4...@1stg/eslint-config@0.13.5) (2019-10-28)


### Bug Fixes

* **eslint-config:** angular rules should take higher priority ([a4860d4](https://github.com/1stG/configs/commit/a4860d4ce2d6e6c011901c12eb4b87b251afc7e2))





## [0.13.4](https://github.com/1stG/configs/compare/@1stg/eslint-config@0.13.3...@1stg/eslint-config@0.13.4) (2019-10-28)


### Bug Fixes

* **eslint-config:** rename isNgAvailable to isNgAvailable ([9471805](https://github.com/1stG/configs/commit/9471805156f94b713c47eeb3a977ac85dab7e476))





## [0.13.3](https://github.com/1stG/configs/compare/@1stg/eslint-config@0.13.2...@1stg/eslint-config@0.13.3) (2019-10-28)


### Bug Fixes

* **eslint-config:** use @pkgr/utils to simplify codes ([0ae5b71](https://github.com/1stG/configs/commit/0ae5b7182acd934681081a4d5a756b4ec7b711b2))





## [0.13.2](https://github.com/1stG/configs/compare/@1stg/eslint-config@0.13.1...@1stg/eslint-config@0.13.2) (2019-10-23)


### Bug Fixes

* **eslint-config:** upgrade eslint-mdx to fix issue of typescript-eslint ([355e578](https://github.com/1stG/configs/commit/355e578dc59cd7c26d80cdac22b365c9857caed0))





## [0.13.1](https://github.com/1stG/configs/compare/@1stg/eslint-config@0.13.0...@1stg/eslint-config@0.13.1) (2019-10-22)


### Bug Fixes

* set parser option for vue correctly ([a9804e0](https://github.com/1stG/configs/commit/a9804e042131cb05eb7fcab6dcb26b3f62015d9b))
* treat mdx as jsx correctly, remove standard-jsx for vue ([e9e488f](https://github.com/1stG/configs/commit/e9e488ffdd1685a5881f46c4824c4ec37f4f10d1))
* **eslint-config:** split react and vue config correctly ([ce82dd8](https://github.com/1stG/configs/commit/ce82dd82ea4d8c8caca0f67162ce42db7558277c))





# [0.13.0](https://github.com/1stG/configs/compare/@1stg/eslint-config@0.12.22...@1stg/eslint-config@0.13.0) (2019-10-22)


### Features

* **eslint-config:** check react and vue availability like angular ([c6fcb11](https://github.com/1stG/configs/commit/c6fcb11f765230c2b00bf6f4927f9df0948b5961))





## [0.12.22](https://github.com/1stG/configs/compare/@1stg/eslint-config@0.12.21...@1stg/eslint-config@0.12.22) (2019-10-21)


### Bug Fixes

* **eslint-config:** disable node/shebang for {bin,cli}.ts ([42cdbf0](https://github.com/1stG/configs/commit/42cdbf0199d16b94192ab707b765f780ada5cb81))





## [0.12.21](https://github.com/1stG/configs/compare/@1stg/eslint-config@0.12.20...@1stg/eslint-config@0.12.21) (2019-10-15)


### Bug Fixes

* **eslint-config:** disable some redundant rules ([837f6f3](https://github.com/1stG/configs/commit/837f6f3c051e3704247cccf5044ff8f0c285209e))





## [0.12.20](https://github.com/1stG/configs/compare/@1stg/eslint-config@0.12.19...@1stg/eslint-config@0.12.20) (2019-10-05)


### Bug Fixes

* **deps:** upgrade buggy/outdated (dev)Dependencies ([7dceac0](https://github.com/1stG/configs/commit/7dceac0))





## [0.12.19](https://github.com/1stG/configs/compare/@1stg/eslint-config@0.12.18...@1stg/eslint-config@0.12.19) (2019-10-03)


### Bug Fixes

* **babel-preset:** detect react-hot-loader and enable it automatically ([795a2fe](https://github.com/1stG/configs/commit/795a2fe))





## [0.12.18](https://github.com/1stG/configs/compare/@1stg/eslint-config@0.12.17...@1stg/eslint-config@0.12.18) (2019-10-01)


### Bug Fixes

* **browserslist-config:** update modern queries, bump dep versions ([d749107](https://github.com/1stG/configs/commit/d749107))
* **eslint-config:** disable some no so useful rules, add stories and config ([74d1a69](https://github.com/1stG/configs/commit/74d1a69))





## [0.12.17](https://github.com/1stG/configs/compare/@1stg/eslint-config@0.12.16...@1stg/eslint-config@0.12.17) (2019-10-01)


### Bug Fixes

* **postcss-config:** add postcss-modules support, skip npm and .global.* files  automatically ([b4e7d15](https://github.com/1stG/configs/commit/b4e7d15))
* upgrade eslint to 6.5.1 to fix `no-useless-rename` ([bd6fc13](https://github.com/1stG/configs/commit/bd6fc13))





## [0.12.16](https://github.com/1stG/configs/compare/@1stg/eslint-config@0.12.15...@1stg/eslint-config@0.12.16) (2019-09-30)


### Bug Fixes

* **eslint-config:** add 1024 as magic number, extends jest rules from test ([e41f0cf](https://github.com/1stG/configs/commit/e41f0cf))





## [0.12.15](https://github.com/1stG/configs/compare/@1stg/eslint-config@0.12.14...@1stg/eslint-config@0.12.15) (2019-09-29)


### Bug Fixes

* **eslint-config:** no need to enable tslint twice if tslint.json presents ([6505628](https://github.com/1stG/configs/commit/6505628))





## [0.12.14](https://github.com/1stG/configs/compare/@1stg/eslint-config@0.12.13...@1stg/eslint-config@0.12.14) (2019-09-29)


### Bug Fixes

* disable node/no-extraneous-import for .d.ts ([dcaf6b4](https://github.com/1stG/configs/commit/dcaf6b4))





## [0.12.13](https://github.com/1stG/configs/compare/@1stg/eslint-config@0.12.12...@1stg/eslint-config@0.12.13) (2019-09-26)


### Bug Fixes

* **deps:** bump dependencies, add tslint-config/eslint, disable no-namespace for .d.ts ([8b340e8](https://github.com/1stG/configs/commit/8b340e8))





## [0.12.12](https://github.com/1stG/configs/compare/@1stg/eslint-config@0.12.11...@1stg/eslint-config@0.12.12) (2019-09-23)


### Bug Fixes

* check package.json existence, add compose tsconfig ([47da218](https://github.com/1stG/configs/commit/47da218))





## [0.12.11](https://github.com/1stG/configs/compare/@1stg/eslint-config@0.12.10...@1stg/eslint-config@0.12.11) (2019-09-23)


### Bug Fixes

* allow triple-slash for path, add more common tsconfigs ([69996d3](https://github.com/1stG/configs/commit/69996d3))





## [0.12.10](https://github.com/1stG/configs/compare/@1stg/eslint-config@0.12.9...@1stg/eslint-config@0.12.10) (2019-09-21)


### Bug Fixes

* **eslint-config:** disable rule node/no-extraneous-require like node/no-extraneous-import for test(s) ([eb88521](https://github.com/1stG/configs/commit/eb88521))





## [0.12.9](https://github.com/1stG/configs/compare/@1stg/eslint-config@0.12.8...@1stg/eslint-config@0.12.9) (2019-09-21)


### Bug Fixes

* disable ban-ts-ignore, enable allow-empty-catch ([3bb2b34](https://github.com/1stG/configs/commit/3bb2b34))





## [0.12.8](https://github.com/1stG/configs/compare/@1stg/eslint-config@0.12.7...@1stg/eslint-config@0.12.8) (2019-09-20)


### Bug Fixes

* **eslint-config:** only enable compat plugin if browserslist installed specifically ([6ce0240](https://github.com/1stG/configs/commit/6ce0240))





## [0.12.7](https://github.com/1stG/configs/compare/@1stg/eslint-config@0.12.6...@1stg/eslint-config@0.12.7) (2019-09-19)


### Bug Fixes

* incorrect src directory, add i bin for imagemin ([6281909](https://github.com/1stG/configs/commit/6281909))





## [0.12.6](https://github.com/1stG/configs/compare/@1stg/eslint-config@0.12.5...@1stg/eslint-config@0.12.6) (2019-09-18)


### Bug Fixes

* **eslint-config:** bump eslint-plugin-prettier, add more common magic numbers ([01d94a3](https://github.com/1stG/configs/commit/01d94a3))





## [0.12.5](https://github.com/1stG/configs/compare/@1stg/eslint-config@0.12.4...@1stg/eslint-config@0.12.5) (2019-09-18)


### Bug Fixes

* **eslint-config:** add common ignorable magic numbers ([5f8f2e1](https://github.com/1stG/configs/commit/5f8f2e1))





## [0.12.4](https://github.com/1stG/configs/compare/@1stg/eslint-config@0.12.3...@1stg/eslint-config@0.12.4) (2019-09-18)


### Bug Fixes

* **eslint-config:** refactor vue config based on ts config without types ([e5fc2a1](https://github.com/1stG/configs/commit/e5fc2a1))





## [0.12.3](https://github.com/1stG/configs/compare/@1stg/eslint-config@0.12.2...@1stg/eslint-config@0.12.3) (2019-09-18)


### Bug Fixes

* **eslint-config:** exports.angular is an array, use concat directly ([6d5f759](https://github.com/1stG/configs/commit/6d5f759))





## [0.12.2](https://github.com/1stG/configs/compare/@1stg/eslint-config@0.12.1...@1stg/eslint-config@0.12.2) (2019-09-18)


### Bug Fixes

* **eslint-config:** extract angular overrides, resolve src(/app) automatically ([0b98eb6](https://github.com/1stG/configs/commit/0b98eb6))





## [0.12.1](https://github.com/1stG/configs/compare/@1stg/eslint-config@0.12.0...@1stg/eslint-config@0.12.1) (2019-09-17)


### Bug Fixes

* **eslint-config:** remove @typescript-eslint/strict-boolean-expressions rule ([3b24b4e](https://github.com/1stG/configs/commit/3b24b4e))





# [0.12.0](https://github.com/1stG/configs/compare/@1stg/eslint-config@0.11.1...@1stg/eslint-config@0.12.0) (2019-09-17)


### Features

* **eslint-config:** support angular/webpack out of box, more rules ([657eb68](https://github.com/1stG/configs/commit/657eb68))





## [0.11.1](https://github.com/1stG/configs/compare/@1stg/eslint-config@0.11.0...@1stg/eslint-config@0.11.1) (2019-09-16)


### Bug Fixes

* **deps:** upgrade eslint-plugin-mdx, use recommended config directly ([6c54a92](https://github.com/1stG/configs/commit/6c54a92))





# [0.11.0](https://github.com/1stG/configs/compare/@1stg/eslint-config@0.10.6...@1stg/eslint-config@0.11.0) (2019-09-16)


### Features

* **eslint:** bump eslint version, use overrides in npm pkg ([8e02136](https://github.com/1stG/configs/commit/8e02136))





## [0.10.6](https://github.com/1stG/configs/compare/@1stg/eslint-config@0.10.5...@1stg/eslint-config@0.10.6) (2019-09-13)


### Bug Fixes

* **eslint:** match deeper and deeper test files! ([3053871](https://github.com/1stG/configs/commit/3053871))





## [0.10.5](https://github.com/1stG/configs/compare/@1stg/eslint-config@0.10.4...@1stg/eslint-config@0.10.5) (2019-09-13)


### Bug Fixes

* **eslint:** match deeper test files ([13da11e](https://github.com/1stG/configs/commit/13da11e))





## [0.10.4](https://github.com/1stG/configs/compare/@1stg/eslint-config@0.10.3...@1stg/eslint-config@0.10.4) (2019-09-13)


### Bug Fixes

* **eslint:** disable node/no-extraneous-import in tests? folder ([aa231f1](https://github.com/1stG/configs/commit/aa231f1))





## [0.10.3](https://github.com/1stG/configs/compare/@1stg/eslint-config@0.10.2...@1stg/eslint-config@0.10.3) (2019-09-13)


### Bug Fixes

* **eslint:** statSync also breaks if packages does not exist ([0f7a37f](https://github.com/1stG/configs/commit/0f7a37f))





## [0.10.2](https://github.com/1stG/configs/compare/@1stg/eslint-config@0.10.1...@1stg/eslint-config@0.10.2) (2019-09-13)


### Bug Fixes

* **eslint:** readdirSync breaks if packages does not exist ([f10c8dd](https://github.com/1stG/configs/commit/f10c8dd))





## [0.10.1](https://github.com/1stG/configs/compare/@1stg/eslint-config@0.10.0...@1stg/eslint-config@0.10.1) (2019-09-13)


### Bug Fixes

* **deps:** bump dep versions, support directory option of ts resolver ([0c6bcf1](https://github.com/1stG/configs/commit/0c6bcf1))





# [0.10.0](https://github.com/1stG/configs/compare/@1stg/eslint-config@0.9.3...@1stg/eslint-config@0.10.0) (2019-09-12)


### Features

* **eslint:** enable `excludedFiles` feature to simplify ts linter ([63f9332](https://github.com/1stG/configs/commit/63f9332))





## [0.9.3](https://github.com/1stG/configs/compare/@1stg/eslint-config@0.9.2...@1stg/eslint-config@0.9.3) (2019-09-10)


### Bug Fixes

* **deps:** enable eslint-import-resolver-ts, add prod option for rollup ([3471316](https://github.com/1stG/configs/commit/3471316))





## [0.9.2](https://github.com/1stG/configs/compare/@1stg/eslint-config@0.9.1...@1stg/eslint-config@0.9.2) (2019-09-09)


### Bug Fixes

* **eslint:** disable promise/catch-or-return for ts files ([d4bc677](https://github.com/1stG/configs/commit/d4bc677))





## [0.9.1](https://github.com/1stG/configs/compare/@1stg/eslint-config@0.9.0...@1stg/eslint-config@0.9.1) (2019-09-07)


### Bug Fixes

* **deps:** upgrade eslint-plugin-mdx and remark-preset-prettier ([c735d6d](https://github.com/1stG/configs/commit/c735d6d))





# [0.9.0](https://github.com/1stG/configs/compare/@1stg/eslint-config@0.8.2...@1stg/eslint-config@0.9.0) (2019-09-07)


### Features

* **eslint-plugin-node:** resolve packages in [@types](https://github.com/types) automatically ([abb24e6](https://github.com/1stG/configs/commit/abb24e6))





## [0.8.2](https://github.com/1stG/configs/compare/@1stg/eslint-config@0.8.1...@1stg/eslint-config@0.8.2) (2019-09-07)


### Bug Fixes

* add module related rules for eslint config ([5d1c36c](https://github.com/1stG/configs/commit/5d1c36c))





## [0.8.1](https://github.com/1stG/configs/compare/@1stg/eslint-config@0.8.0...@1stg/eslint-config@0.8.1) (2019-09-07)


### Bug Fixes

* **eslint:** try other extensions in overrides rules ([4a48196](https://github.com/1stG/configs/commit/4a48196))





# [0.8.0](https://github.com/1stG/configs/compare/@1stg/eslint-config@0.7.0...@1stg/eslint-config@0.8.0) (2019-09-05)


### Features

* enable eslint-plugin-compat, disable node query temporarily ([a003dac](https://github.com/1stG/configs/commit/a003dac))





# [0.7.0](https://github.com/1stG/configs/compare/@1stg/eslint-config@0.6.0...@1stg/eslint-config@0.7.0) (2019-09-05)


### Features

* enable eslint-plugin-node, more plugins for rollup ([abfa39b](https://github.com/1stG/configs/commit/abfa39b))





# 0.6.0 (2019-09-01)


### Bug Fixes

* disable prettier in eslint for .md temporarily ([8a7f3ed](https://github.com/1stG/configs/commit/8a7f3ed))
* missing error binding in eslint config, bump dependencies ([3210985](https://github.com/1stG/configs/commit/3210985))


### Features

* add rollup config, improve eslint and ts configs ([c3523bb](https://github.com/1stG/configs/commit/c3523bb))
* enable eslint-plugin-tslint ([117a1df](https://github.com/1stG/configs/commit/117a1df))
* enhance eslint-config and more useful tsconfig files ([acae220](https://github.com/1stG/configs/commit/acae220))
* first blood, should just work ([f925e8e](https://github.com/1stG/configs/commit/f925e8e))
* improve babel-preset and eslint-config usage ([4884606](https://github.com/1stG/configs/commit/4884606))
* support lint markdown files, add standard-react config ([8841cde](https://github.com/1stG/configs/commit/8841cde))
* upgrade eslint/stylelint-scss, consider mdx content as jsx ([032e9bf](https://github.com/1stG/configs/commit/032e9bf))
