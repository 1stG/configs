// @ts-check

import eslint from '@eslint/js'
import eslintCommentsConfigs from '@eslint-community/eslint-plugin-eslint-comments/configs'
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript'
import css from 'eslint-plugin-css'
import importX from 'eslint-plugin-import-x'
import { getGlobals } from 'eslint-plugin-mdx'
import n from 'eslint-plugin-n'
import promise from 'eslint-plugin-promise'
import regexp from 'eslint-plugin-regexp'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import sonarjs from 'eslint-plugin-sonarjs'
import unicorn from 'eslint-plugin-unicorn'
import globals from 'globals'
import tseslint from 'typescript-eslint'

import {
  isTsAvailable,
  isWebpackAvailable,
  magicNumbers,
  webpackSpecVars,
  prettierExtends,
} from './_util.js'

export const base = tseslint.config([
  eslint.configs.recommended,
  eslintCommentsConfigs.recommended,
  css.configs['flat/recommended'],
  importX.flatConfigs.recommended,
  n.configs['flat/recommended'],
  promise.configs['flat/recommended'],
  regexp.configs['flat/recommended'],
  sonarjs.configs.recommended,
  unicorn.configs.recommended,
  prettierExtends,
  {
    name: '@1stg/base',
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    settings: {
      'import-x/external-module-folders': [
        'node_modules',
        'node_modules/@d-ts',
        'node_modules/@types',
      ],
      'import-x/resolver-next': [createTypeScriptImportResolver()],
    },
    languageOptions: {
      sourceType: 'module',
      ecmaVersion: 'latest',
      globals: {
        ...globals.builtin,
        ...(isWebpackAvailable && getGlobals(webpackSpecVars)),
      },
    },
    rules: {
      '@eslint-community/eslint-comments/disable-enable-pair': [
        2,
        {
          allowWholeFile: true,
        },
      ],
      '@eslint-community/eslint-comments/no-unused-disable': 2,
      'arrow-body-style': 2,
      camelcase: [
        2,
        {
          properties: 'never',
          ignoreDestructuring: true,
          allow: isWebpackAvailable ? webpackSpecVars : undefined,
        },
      ],
      curly: [2, 'all'],
      'import-x/first': 2,
      'import-x/newline-after-import': 2,
      'import-x/no-duplicates': 2,
      'import-x/order': [
        2,
        {
          alphabetize: {
            order: 'asc',
          },
          'newlines-between': 'always',
        },
      ],
      'no-else-return': [
        2,
        {
          allowElseIf: false,
        },
      ],
      'no-empty': [
        2,
        {
          allowEmptyCatch: true,
        },
      ],
      'no-empty-function': 2,
      'no-labels': isTsAvailable ? 0 : 2, // sonar/no-labels
      'no-magic-numbers': [
        2,
        {
          enforceConst: true,
          ignore: magicNumbers,
          ignoreArrayIndexes: true,
        },
      ],
      'no-negated-condition': 2,
      'no-process-exit': 0, // suspended by unicorn/no-process-exit

      // The following rules are duplicate with `eslint-plugin-import`
      'n/no-extraneous-import': 0,
      'n/no-extraneous-require': 0,
      'n/no-missing-import': 0,
      'n/no-missing-require': 0,

      'n/no-unsupported-features/es-syntax': 0,
      'n/no-unsupported-features/node-builtins': 0,
      'n/no-unpublished-import': 0,
      'n/no-unpublished-require': 0,
      'prefer-const': 2,
      'prefer-object-spread': 2,
      'simple-import-sort/exports': 2,
      'unicorn/catch-error-name': [
        2,
        {
          name: 'error',
          ignore: ['^e(rr)?$'],
        },
      ],
      'unicorn/consistent-function-scoping': 0,
      'unicorn/filename-case': [
        2,
        {
          cases: {
            kebabCase: true,
            pascalCase: true,
          },
          // ignore UPPER_CASE markdown or yaml filenames
          ignore: [/^[A-Z](([\dA-Z]+_)*[\dA-Z]+)?\.(mdx?|ya?ml)$/],
        },
      ],
      'unicorn/no-array-reduce': 0,
      'unicorn/no-null': 0,
      'unicorn/no-unreadable-array-destructuring': 0, // conflict with `no-unused-vars`
      'unicorn/prefer-module': 0,
      'unicorn/prefer-object-from-entries': 0,
      'unicorn/prevent-abbreviations': 0,
    },
  },
  {
    ignores: [
      '**/*.less',
      '**/*.log',
      '**/*.patch',
      '**/*.sass',
      '**/*.scss',
      '**/.type-coverage',
      '**/coverage',
      '**/dist',
      '**/lib',
      '**/node_modules',
      '**/CHANGELOG.md',
      '**/yarn.lock',
      '**/package-lock.json',
      '**/pnpm-lock.yaml',
      '**/.yarn',
      '!.github',
      '!.*.{cjs,js,mjs,cts,ts,mts}',
    ],
  },
])
