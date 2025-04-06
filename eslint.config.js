// @ts-check

import tseslint from 'typescript-eslint'

import recommended from '@1stg/eslint-config'

export default tseslint.config([
  recommended,
  {
    rules: {
      'react/react-in-jsx-scope': 'off',
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
