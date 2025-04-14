// @ts-check

import jest_ from 'eslint-plugin-jest'
import globals from 'globals'
import tseslint from 'typescript-eslint'

import { test } from './test.js'

export const jest = tseslint.config({
  name: '@1stg/jest',
  files: ['**/*.{spec,test}.{js,jsx,ts,tsx}'],
  extends: [jest_.configs['flat/recommended']],
  languageOptions: {
    globals: globals.jest,
  },
  rules: test.rules,
})
