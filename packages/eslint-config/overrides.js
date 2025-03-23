// @ts-check

/**
 * @import {Linter} from 'eslint'
 */

import path from 'node:path'

import { jsoncFiles, nonJsonRcFiles, preferPrettier } from '@1stg/config'
import babelParser from '@babel/eslint-parser'
import babel from '@babel/eslint-plugin'
import react_ from '@eslint-react/eslint-plugin'
import { isPkgAvailable, tryFile, tryPkg } from '@pkgr/utils'
import vitest_ from '@vitest/eslint-plugin'
import angular_ from 'angular-eslint'
import angularTemplateParser from 'angular-eslint-template-parser'
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript'
import eslintMdx from 'eslint-mdx'
import importX from 'eslint-plugin-import-x'
import jest_ from 'eslint-plugin-jest'
import jsdoc from 'eslint-plugin-jsdoc'
import jsonc_ from 'eslint-plugin-jsonc'
import * as mdx_ from 'eslint-plugin-mdx'
import * as reactHooks_ from 'eslint-plugin-react-hooks'
import toml_ from 'eslint-plugin-toml'
import vue_ from 'eslint-plugin-vue'
import yml_ from 'eslint-plugin-yml'
import tseslint from 'typescript-eslint'
import vueParser from 'vue-eslint-parser'

import { isTsAvailable, magicNumbers, prettierExtends } from './_util.js'

/**
 * @import {TSESLint} from '@typescript-eslint/utils'
 */

const configFile =
  tryFile(path.resolve('babel.config.js')) ||
  tryFile(path.resolve('.babelrc.js')) ||
  tryPkg('@1stg/babel-preset/config')

/**
 * @satisfies {TSESLint.FlatConfig.Config}
 */
const jsBase = {
  name: '@1stg/js-base',
  files: ['**/*.{cjs,mjs,js,jsx}'],
  languageOptions: {
    parser: babelParser,
    parserOptions: configFile
      ? { babelOptions: { configFile } }
      : { requireConfigFile: false },
  },
  plugins: {
    '@babel': babel,
  },
  rules: {
    camelcase: [
      2,
      {
        properties: 'never',
        ignoreDestructuring: true,
      },
    ],
    'new-cap': 0,
    'no-invalid-this': 0,
    'no-unused-expressions': 0,
    '@babel/new-cap': 2,
    '@babel/no-invalid-this': 2,
    '@babel/no-unused-expressions': 2,
  },
}

const jsdocConfig = jsdoc.configs['flat/recommended']

export const js = tseslint.config({
  ...jsBase,
  name: '@1stg/js',
  extends: [jsdocConfig],
  rules: {
    ...jsBase.rules,
    'jsdoc/require-jsdoc': 0,
    'jsdoc/require-param-description': 0,
    'jsdoc/tag-lines': [
      1,
      'never',
      {
        startLines: 1,
      },
    ],
  },
  settings: isTsAvailable
    ? {
        jsdoc: {
          mode: 'typescript',
        },
      }
    : undefined,
})

const project =
  tryFile(path.resolve('tsconfig.eslint.json')) ||
  tryFile(path.resolve('tsconfig.base.json')) ||
  tryFile(path.resolve('tsconfig.json')) ||
  tryPkg('@1stg/tsconfig')

const resolveSettings = {
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

const tsBase = tseslint.config({
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

export const ts = tseslint.config(
  tsBase,
  {
    name: '@1stg/cli',
    files: ['**/{bin,cli}.ts'],
    rules: {
      'n/hashbang': 0,
    },
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
      '@typescript-eslint/no-floating-promises': [
        2,
        {
          ignoreVoid: true,
        },
      ],
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
        {
          ignoreStringArrays: true,
        },
      ],
      '@typescript-eslint/restrict-plus-operands': 2,
      'no-constant-condition': 0,
      'no-magic-numbers': 0,
    },
  },
)

/**
 * @satisfies {TSESLint.FlatConfig.Config}
 */
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

const reactJsx = tseslint.config({
  name: '@1stg/react-jsx',
  extends: [react_.configs.recommended, prettierExtends],
  settings: {
    react: {
      version: 'detect',
    },
  },
})

export const react = tseslint.config(
  {
    name: '@1stg/react',
    files: ['**/*.{js,jsx,tsx}'],
    extends: [reactJsx],
    rules: {
      '@eslint-react/avoid-shorthand-boolean': 2,
      // '@eslint-react/naming-convention/handler-prop': [
      //   2,
      //   {
      //     eventHandlerPrefix: false,
      //     eventHandlerPropPrefix: 'on',
      //   },
      // ],
      'sonarjs/function-name': isTsAvailable
        ? [2, { format: String.raw`^_?[a-zA-Z][a-zA-Z0-9]*\$?$` }]
        : 0,
    },
  },
  {
    name: '@1stg/react-tsx',
    files: ['**/*.tsx'],
    rules: {
      '@eslint-react/display-name': 0,
    },
  },
  {
    name: '@1stg/react-hooks',
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: { 'react-hooks': reactHooks_ },
    rules: {
      'react-hooks/rules-of-hooks': 2,
      'react-hooks/exhaustive-deps': 2,
    },
  },
  {
    name: '@1stg/react-ts',
    files: ['**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [2, 'prop-types'],
      '@eslint-react/prop-types': 0,
    },
  },
)

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
    extends: [
      // 'plugin:markup/recommended',
      ...vueExtends,
    ],
    rules: {
      'no-unused-vars': 0,
      '@typescript-eslint/no-unused-vars': 0,
    },
  },
)

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
      // 'plugin:markup/recommended',
      prettierExtends,
    ],
    languageOptions: {
      parser: angularTemplateParser,
    },
    rules: {
      '@angular-eslint/template/eqeqeq': [
        2,
        {
          allowNullOrUndefined: true,
        },
      ],
      'prettier/prettier': preferPrettier ? 0 : [2, { parser: 'angular' }],
      'spaced-comment': 0,
    },
  },
  {
    files: ['**/*inline-template-*.component.html'],
    rules: {
      'unicorn/no-empty-file': 0,
    },
  },
)

/* eslint-disable sonarjs/no-commented-code */
// export const markup = [
//   {
//     files: '**/*.html',
//     extends: 'plugin:markup/recommended',
//     rules: {
//       'prettier/prettier': [
//         preferPrettier ? 0 : 2,
//         {
//           parser: 'html',
//         },
//       ],
//     },
//   },
//   {
//     files: '**/*.pug',
//     extends: ['plugin:markup/recommended', ...prettierExtends],
//   },
// ]
/* eslint-enable sonarjs/no-commented-code */

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

const nonSourceRules = /** @type {const} */ ({
  'n/no-extraneous-import': 0,
  'n/no-extraneous-require': 0,
  'n/no-unsupported-features/es-builtins': 0,
})

/**
 * @satisfies {TSESLint.FlatConfig.Config}
 */
export const test = {
  name: '@1stg/test',
  files: ['**/{__test__,test,tests}/**/*'],
  rules: nonSourceRules,
}

export const tests = test

export const jest = tseslint.config({
  name: '@1stg/jest',
  files: ['**/*.{spec,test}.{js,jsx,ts,tsx}'],
  extends: [jest_.configs['flat/recommended']],
  rules: test.rules,
})

export const vitest = tseslint.config({
  name: '@1stg/vitest',
  files: ['**/*.{spec,test}.{js,jsx,ts,tsx}'],
  extends: [vitest_.configs.recommended],
  rules: test.rules,
})

/**
 * @satisfies {TSESLint.FlatConfig.Config}
 */
export const script = {
  name: '@1stg/script',
  files: ['**/scripts/**/*'],
  rules: nonSourceRules,
}

export const scripts = script

/**
 * @satisfies {TSESLint.FlatConfig.Config}
 */
export const story = {
  name: '@1stg/story',
  files: ['**/.storybook/**/*', '**/stories/**/*'],
  rules: nonSourceRules,
}

export const stories = story

/**
 * @satisfies {TSESLint.FlatConfig.Config}
 */
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

const isReactAvailable = isPkgAvailable('react')

export const overrides = tseslint.config(
  isPkgAvailable('@babel/core') ? js : [],
  isTsAvailable ? ts : [],
  isReactAvailable ? react : [],
  // The order matters, the later should to be preferred
  // markup,
  isPkgAvailable('vue') ? vue : [],
  isPkgAvailable('@angular/core') ? angular : [],
  md,
  mdx,
  isPkgAvailable('jest') ? jest : [],
  isPkgAvailable('vitest') ? vitest : [],
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
)
