// @ts-check

/** @import { TSESLint } from '@typescript-eslint/utils' */

import { jsoncFiles, nonJsonRcFiles, preferPrettier } from '@1stg/config'
import { isPkgAvailable } from '@pkgr/utils'
import * as eslintMdx from 'eslint-mdx'
import jsonc_ from 'eslint-plugin-jsonc'
import * as markup_ from 'eslint-plugin-markup'
import * as mdx_ from 'eslint-plugin-mdx'
import toml_ from 'eslint-plugin-toml'
import yml_ from 'eslint-plugin-yml'
import tseslint from 'typescript-eslint'

import {
  isTsAvailable,
  magicNumbers,
  nonSourceRules,
  prettierExtends,
} from './_util.js'
import { jsBase } from './js-base.js'
import { js } from './js.js'
import { reactJsx } from './react.js'
import { test } from './test.js'
import { resolveSettings, tsBase } from './ts-base.js'

export const ts = tseslint.config(
  tsBase,
  {
    name: '@1stg/cli',
    files: ['**/{bin,cli}.ts'],
    rules: { 'n/hashbang': 0 },
  },
  {
    name: '@1stg/code-block',
    files: ['**/*.{md,mdx}/**/*.{cts,mts,ts,tsx}'],
    languageOptions: {
      parserOptions: {
        project: null,
      },
    },
  },
  {
    name: '@1stg/ts',
    files: ['**/*.{cts,mts,ts,tsx}'],
    ignores: [
      '**/*.{md,mdx}/**/*.{cts,mts,ts,tsx}',
      '*.d.{cts,mts,ts}',
      '*.d.*.{cts,mts,ts}',
    ],
    extends: [tseslint.configs.recommendedTypeChecked],
    rules: {
      '@typescript-eslint/no-floating-promises': [2, { ignoreVoid: true }],
      '@typescript-eslint/no-magic-numbers': [
        2,
        {
          enforceConst: true,
          ignore: magicNumbers,
          ignoreArrayIndexes: true,
          ignoreEnums: true,
          ignoreNumericLiteralTypes: true,
          ignoreReadonlyClassProperties: true,
        },
      ],
      '@typescript-eslint/no-unnecessary-condition': 2,
      '@typescript-eslint/no-unnecessary-qualifier': 2,
      '@typescript-eslint/no-unnecessary-type-arguments': 2,
      '@typescript-eslint/prefer-optional-chain': 2,
      '@typescript-eslint/prefer-readonly': 2,
      '@typescript-eslint/prefer-reduce-type-parameter': 2,
      '@typescript-eslint/prefer-string-starts-ends-with': 2,
      '@typescript-eslint/require-array-sort-compare': [
        2,
        { ignoreStringArrays: true },
      ],
      '@typescript-eslint/restrict-plus-operands': 2,
      'no-constant-condition': 0,
      'no-magic-numbers': 0,
    },
  },
  {
    files: ['**/*.cts'],
    rules: {
      '@typescript-eslint/no-require-imports': 0,
    },
  },
)

/** @satisfies {TSESLint.FlatConfig.Config} */
export const dTs = {
  name: '@1stg/d-ts',
  files: ['**/*.d.{cts,mts,ts}', '**/*.d.*.{cts,mts,ts}'],
  rules: {
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-extraneous-class': 0,
    '@typescript-eslint/no-namespace': 0,
    '@typescript-eslint/no-unused-vars': 0,
    'import-x/no-duplicates': 0,
    'import-x/order': 0,
  },
}

export const markup = tseslint.config(
  {
    name: '@1stg/markup-html',
    files: ['**/*.html'],
    extends: [markup_.configs.flatRecommended],
    rules: {
      'prettier/prettier': [preferPrettier ? 0 : 2, { parser: 'html' }],
    },
  },
  {
    name: '@1stg/markup-pug',
    files: ['**/*.pug'],
    extends: [markup_.configs.flatRecommended, ...prettierExtends],
  },
)

export const md = tseslint.config(
  {
    name: '@1stg/md',
    files: ['**/*.md'],
    extends: [mdx_.configs.flat],
    rules: {
      'prettier/prettier': preferPrettier ? 0 : 2,
    },
  },
  mdx_.configs.flatCodeBlocks,
)

export const mdx = tseslint.config(
  {
    name: '@1stg/mdx',
    files: ['**/*.mdx'],
    extends: [reactJsx, mdx_.configs.flat],
    languageOptions: {
      ...jsBase.languageOptions,
      parser: eslintMdx,
    },
    settings: { ...reactJsx[0].settings, ...resolveSettings },
    rules: {
      'prettier/prettier': preferPrettier ? 0 : 2,
    },
  },
  mdx_.configs.flatCodeBlocks,
)

/** @satisfies {TSESLint.FlatConfig.Config} */
export const script = {
  name: '@1stg/script',
  files: ['**/scripts/**/*'],
  rules: nonSourceRules,
}

export const scripts = script

/** @satisfies {TSESLint.FlatConfig.Config} */
export const story = {
  name: '@1stg/story',
  files: ['**/.storybook/**/*', '**/stories/**/*'],
  rules: nonSourceRules,
}

export const stories = story

/** @satisfies {TSESLint.FlatConfig.Config} */
export const config = {
  name: '@1stg/config',
  files: ['**/.*.js', '**/*.config.{js,ts}'],
  rules: nonSourceRules,
}

export const configs = config

export const json = tseslint.config({
  name: '@1stg/json',
  files: ['**/.*rc', '**/*.json'],
  ignores: [...nonJsonRcFiles, ...jsoncFiles],
  extends: [
    jsonc_.configs['flat/recommended-with-json'],
    jsonc_.configs['flat/prettier'],
  ],
})

export const jsonc = tseslint.config({
  name: '@1stg/jsonc',
  files: jsoncFiles,
  extends: [
    jsonc_.configs['flat/recommended-with-jsonc'],
    jsonc_.configs['flat/prettier'],
  ],
})

export const json5 = tseslint.config({
  name: '@1stg/json5',
  files: ['**/*.json5'],
  extends: [
    jsonc_.configs['flat/recommended-with-json5'],
    jsonc_.configs['flat/prettier'],
  ],
})

export const toml = tseslint.config({
  name: '@1stg/toml',
  files: ['**/*.toml'],
  extends: [toml_.configs['flat/recommended']],
})

export const yaml = tseslint.config({
  files: ['**/*.yml', '**/*.yaml'],
  extends: [yml_.configs['flat/recommended'], yml_.configs['flat/prettier']],
})

export const yml = yaml

export const overrides = tseslint.config(
  js,
  isTsAvailable ? ts : [],
  isPkgAvailable('@eslint-react/eslint-plugin')
    ? await import('./react.js').then(({ react }) => react)
    : [],
  // The order matters, the later should to be preferred
  markup,
  isPkgAvailable('eslint-plugin-vue')
    ? await import('./vue.js').then(({ vue }) => vue)
    : [],
  isPkgAvailable('angular-eslint')
    ? await import('./angular.js').then(({ angular }) => angular)
    : [],
  md,
  mdx,
  isPkgAvailable('eslint-plugin-jest')
    ? await import('./jest.js').then(({ jest }) => jest)
    : [],
  isPkgAvailable('@vitest/eslint-plugin')
    ? await import('./vitest.js').then(({ vitest }) => vitest)
    : [],
  test,
  scripts,
  stories,
  configs,
  dTs,
  json,
  jsonc,
  json5,
  toml,
  yaml,
  // https://github.com/prettier/eslint-config-prettier#curly
  {
    name: '@1stg/prettier',
    rules: {
      curly: [2, 'all'],
    },
  },
)
