import { preferPrettier } from '@1stg/config'
import { isPkgAvailable } from '@pkgr/core'

import base from './base.js'
import scss from './scss/index.js'
import scssLoose from './scss/loose.js'

const disablePrettierOptions = !preferPrettier &&
  isPkgAvailable('eslint') && {
    rules: {
      'prettier/prettier': null,
    },
  }

/**
 * @param {boolean} loose
 * @returns {Config} Stylelint configuration
 * @import {Config} from 'stylelint'
 */
export const overrides = loose => ({
  ...base,
  overrides: [
    {
      files: ['**/*.md', '**/*.mdx'],
      customSyntax: 'postcss-markdown',
      ...disablePrettierOptions,
    },
    {
      files: ['**/*.html', '**/*.vue'],
      customSyntax: 'postcss-html',
      ...disablePrettierOptions,
    },
    {
      files: ['**/*.less'],
      customSyntax: 'postcss-less',
    },
    {
      files: ['**/*.sass', '**/*.scss'],
      ...(loose ? scssLoose : scss),
    },
  ],
})
