// @ts-check

import vitest_ from '@vitest/eslint-plugin'
import globals from 'globals'
import tseslint from 'typescript-eslint'

import { test } from './test.js'

export const vitest = tseslint.config({
  name: '@1stg/vitest',
  files: ['**/*.{spec,test}.{js,jsx,ts,tsx}'],
  extends: [vitest_.configs.recommended],
  languageOptions: {
    globals: globals.vitest,
  },
  rules: test.rules,
})
