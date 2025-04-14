// @ts-check

/** @import { TSESLint } from '@typescript-eslint/utils' */

import { tryFile, tryPkg, tryRequirePkg } from '@pkgr/utils'

/** @type {string | undefined} */
let configFile

export const isBabelAvailable =
  tryPkg('@babel/eslint-parser') && tryPkg('@babel/eslint-plugin')

/** @satisfies {TSESLint.FlatConfig.Config} */
export const jsBase = {
  name: '@1stg/js-base',
  files: ['**/*.{cjs,mjs,js,jsx}'],
  languageOptions: isBabelAvailable
    ? {
        parser: tryRequirePkg('@babel/eslint-parser'),
        // eslint-disable-next-line no-cond-assign, sonarjs/no-nested-assignment
        parserOptions: (configFile =
          tryFile('babel.config.js') ||
          tryFile('.babelrc.js') ||
          tryPkg('@1stg/babel-preset/config'))
          ? { babelOptions: { configFile } }
          : { requireConfigFile: false },
      }
    : {},
  plugins: isBabelAvailable
    ? {
        '@babel': /** @type {Omit<TSESLint.FlatConfig.Plugin, 'configs'>} */ (
          tryRequirePkg('@babel/eslint-plugin')
        ),
      }
    : undefined,
  rules: {
    camelcase: [2, { properties: 'never', ignoreDestructuring: true }],
    ...(isBabelAvailable && {
      'new-cap': 0,
      'no-invalid-this': 0,
      'no-unused-expressions': 0,
      '@babel/new-cap': 2,
      '@babel/no-invalid-this': 2,
      '@babel/no-unused-expressions': 2,
    }),
  },
}
