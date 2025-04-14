// @ts-check

import babelParser from '@babel/eslint-parser'
import * as markup from 'eslint-plugin-markup'
import vue_ from 'eslint-plugin-vue'
import tseslint from 'typescript-eslint'
import vueParser from 'vue-eslint-parser'

import { isTsAvailable, prettierExtends } from './_util.js'
import { jsBase } from './js-base.js'
import { tsBase } from './ts-base.js'

const vueExtends = tseslint.config(
  vue_.configs['flat/recommended'],
  prettierExtends,
)

export const vue = tseslint.config(
  {
    ...jsBase,
    name: '@1stg/js-vue',
    files: /** @type {string[]} */ (
      [...jsBase.files, !isTsAvailable && '**/*.vue'].filter(Boolean)
    ),
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        ...jsBase.languageOptions.parserOptions,
        parser: babelParser,
      },
    },
    extends: vueExtends,
  },
  isTsAvailable
    ? {
        name: '@1stg/ts-vue',
        extends: [...tsBase, ...vueExtends],
        files: [.../** @type {string[]} */ (tsBase[0].files), '**/*.vue'],
        languageOptions: {
          parser: vueParser,
          parserOptions: {
            parser: tseslint.parser,
            extraFileExtensions: ['.vue'],
          },
        },
      }
    : [],
  {
    name: '@1stg/vue',
    files: ['**/*.vue'],
    extends: [markup.configs.flatRecommended, ...vueExtends],
    rules: {
      'no-unused-vars': 0,
      '@typescript-eslint/no-unused-vars': 0,
    },
  },
)
