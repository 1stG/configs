// @ts-check

/** @import {TSESLint} from '@typescript-eslint/utils' */

import { nonSourceRules } from './_util.js'

/** @satisfies {TSESLint.FlatConfig.Config} */
export const test = {
  name: '@1stg/test',
  files: ['**/{__test__,test,tests}/**/*'],
  rules: nonSourceRules,
}

export const tests = test
