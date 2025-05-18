// @ts-check

import { preferPrettier } from '@1stg/config'
import angular_ from 'angular-eslint'
import angularTemplateParser from 'angular-eslint-template-parser'
import * as markup_ from 'eslint-plugin-markup'
import tseslint from 'typescript-eslint'

import { prettierExtends, project } from './_util.js'

export const angular = tseslint.config(
  {
    name: '@1stg/angular-ts',
    files: ['**/*.ts'],
    ignores: ['**/*.d.ts'],
    languageOptions: {
      parserOptions: {
        project,
      },
    },
    extends: [angular_.configs.tsRecommended, prettierExtends],
    processor: angular_.processInlineTemplates,
    rules: {
      '@angular-eslint/prefer-on-push-component-change-detection': 1,
    },
  },
  {
    name: '@1stg/angular-template',
    files: ['**/*.html'],
    extends: [
      angular_.configs.templateRecommended,
      markup_.configs.flatRecommended,
      prettierExtends,
    ],
    languageOptions: {
      parser: angularTemplateParser,
    },
    rules: {
      '@angular-eslint/template/eqeqeq': [2, { allowNullOrUndefined: true }],
      'prettier/prettier': preferPrettier ? 0 : [2, { parser: 'angular' }],
      'spaced-comment': 0,
    },
  },
  {
    files: ['**/*inline-template-*.component.html'],
    rules: { 'unicorn-x/no-empty-file': 0 },
  },
)
