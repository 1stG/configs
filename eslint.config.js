// @ts-check

import globals from 'globals'
import tseslint from 'typescript-eslint'

import recommended from '@1stg/eslint-config'

export default tseslint.config([
  recommended,
  {
    rules: {
      '@eslint-react/jsx-uses-react': 'off',
    },
  },
  {
    files: ['packages/{babel-preset,browserslist-config,postcss-config}/*.js'],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    files: ['*.mdx'],
    languageOptions: {
      globals: {
        Button: false,
      },
    },
  },
])
