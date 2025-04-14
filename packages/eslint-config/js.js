// @ts-check

import jsdoc from 'eslint-plugin-jsdoc'
import tseslint from 'typescript-eslint'

import { isTsAvailable } from './_util.js'
import { jsBase } from './js-base.js'

const jsdocConfig = jsdoc.configs['flat/recommended']

export const js = tseslint.config({
  ...jsBase,
  name: '@1stg/js',
  extends: [jsdocConfig],
  rules: {
    ...jsBase.rules,
    'jsdoc/require-jsdoc': 0,
    'jsdoc/require-param-description': 0,
    'jsdoc/tag-lines': [1, 'never', { startLines: 1 }],
  },
  settings: isTsAvailable ? { jsdoc: { mode: 'typescript' } } : undefined,
})
