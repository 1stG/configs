// @ts-check

import { defineConfig } from '@1stg/oxlint-config'

export default defineConfig({
  react: true,
  vitest: true,
  vue: true,
  rules: {
    'react/react-in-jsx-scope': 'off',
  },
})
