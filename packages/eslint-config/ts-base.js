// @ts-check

import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript'
import importX from 'eslint-plugin-import-x'
import tseslint from 'typescript-eslint'

import { prettierExtends, project } from './_util.js'

export const resolveSettings = {
  'import-x/external-module-folders': [
    'node_modules',
    'node_modules/@d-ts',
    'node_modules/@types',
  ],
  'import-x/resolver-next': [
    createTypeScriptImportResolver({
      alwaysTryTypes: true,
      project,
    }),
  ],
}

export const tsBase = tseslint.config({
  name: '@1stg/ts-base',
  files: ['**/*.{cts,mts,ts,tsx}'],
  languageOptions: {
    parserOptions: {
      project,
    },
  },
  extends: [
    tseslint.configs.eslintRecommended,
    tseslint.configs.recommended,
    importX.flatConfigs.typescript,
    prettierExtends,
  ],
  settings: resolveSettings,
  rules: {
    '@typescript-eslint/adjacent-overload-signatures': 2,
    '@typescript-eslint/array-type': [
      2,
      {
        default: 'array-simple',
      },
    ],
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/consistent-type-definitions': [2, 'interface'],
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/explicit-member-accessibility': [
      2,
      {
        accessibility: 'no-public',
        overrides: {
          parameterProperties: 'off',
        },
      },
    ],
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/member-ordering': 2,
    // eslint-disable-line sonarjs/todo-tag -- TODO: find better config
    '@typescript-eslint/naming-convention': 0,
    '@typescript-eslint/no-empty-function': 2,
    '@typescript-eslint/no-extraneous-class': [
      2,
      {
        allowWithDecorator: true,
      },
    ],
    '@typescript-eslint/no-for-in-array': 2,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/no-parameter-properties': 0,
    '@typescript-eslint/no-require-imports': 2,
    '@typescript-eslint/no-this-alias': [
      2,
      {
        allowDestructuring: true,
        allowedNames: ['self'],
      },
    ],
    '@typescript-eslint/no-use-before-define': [
      2,
      {
        classes: false,
        functions: false,
      },
    ],
    '@typescript-eslint/no-useless-constructor': 2,
    '@typescript-eslint/no-unused-vars': [
      2,
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/prefer-for-of': 2,
    '@typescript-eslint/prefer-function-type': 2,
    '@typescript-eslint/prefer-ts-expect-error': 2,
    '@typescript-eslint/sort-type-constituents': 2,
    '@typescript-eslint/triple-slash-reference': [
      2,
      {
        lib: 'never',
        path: 'always',
        types: 'prefer-import',
      },
    ],
    '@typescript-eslint/unified-signatures': 2,
    camelcase: 0,
    'import-x/default': 0,
    'import-x/named': 0,
    'import-x/namespace': 0,
    'import-x/no-duplicates': 2,
    'import-x/no-named-as-default': 0,
    'import-x/no-named-as-default-member': 0,
    'no-empty-function': 0,
    'no-restricted-syntax': [
      2,
      {
        selector:
          'TSTypeAliasDeclaration > .typeAnnotation[type=/^(TS.*Keyword|TSTypeReference)$/]:not(:has(TSTypeParameterInstantiation)):not(:has(TSQualifiedName))',
        message:
          'Type alias references simple `Ts*Keyword`s or `TSTypeReference` only is not allowed',
      },
    ],
    'no-unused-vars': 0,
    'no-use-before-define': 0,
    'no-useless-constructor': 0,
    // covered by @typescript-eslint/no-floating-promises
    'promise/always-return': 0,
    'promise/catch-or-return': 0,
    // ts itself has guaranteed it
    'unicorn/no-array-callback-reference': 0,
    // covered by @typescript-eslint/no-extraneous-class
    'unicorn/no-static-only-class': 0,
    // covered by @typescript-eslint/no-this-alias
    'unicorn/no-this-assignment': 0,
  },
})
