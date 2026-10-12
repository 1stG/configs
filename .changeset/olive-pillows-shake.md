---
"@1stg/app-config": major
"@1stg/babel-preset": major
"@1stg/commitlint-config": major
"@1stg/common-config": major
"@1stg/eslint-config": major
"@1stg/markuplint-config": major
"@1stg/nano-staged": major
"@1stg/postcss-config": major
"@1stg/prettier-config": major
"@1stg/remark-preset": major
"@1stg/stylelint-config": major
---

chore(deps): bump all dependencies, require Node.js `^22.18.0 || >=24.11.0`

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
