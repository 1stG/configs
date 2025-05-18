// @ts-check

import react_ from '@eslint-react/eslint-plugin'
import { tryRequirePkg } from '@pkgr/utils'
import tseslint from 'typescript-eslint'

import { isTsAvailable, prettierExtends } from './_util.js'

export const reactJsx = tseslint.config({
  name: '@1stg/react-jsx',
  extends: [react_.configs.recommended, prettierExtends],
  settings: {
    react: {
      version: 'detect',
    },
  },
})

const reactHooks_ = tryRequirePkg('eslint-plugin-react-hooks')
const reactRefresh = tryRequirePkg('eslint-plugin-react-refresh')

export const react = tseslint.config(
  {
    name: '@1stg/react',
    files: ['**/*.{js,jsx,tsx}'],
    extends: [reactRefresh?.configs.recommended, reactJsx].filter(Boolean),
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
  reactHooks_
    ? {
        name: '@1stg/react-hooks',
        files: ['**/*.{js,jsx,ts,tsx}'],
        plugins: { 'react-hooks': reactHooks_ },
        rules: {
          'react-hooks/rules-of-hooks': 2,
          'react-hooks/exhaustive-deps': 2,
        },
      }
    : [],
  {
    name: '@1stg/react-ts',
    files: ['**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [2, 'prop-types'],
      '@eslint-react/prop-types': 0,
    },
  },
)
