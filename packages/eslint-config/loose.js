// @ts-check

import tseslint from 'typescript-eslint'

import { recommended } from './recommended.js'

export const loose = tseslint.config([
  recommended,
  {
    rules: {
      '@angular-eslint/template/no-negated-async': 0,
      '@typescript-eslint/member-ordering': 0,
      '@typescript-eslint/naming-convention': 0,
      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/no-floating-promises': 0,
      '@typescript-eslint/no-magic-numbers': 0,
      '@typescript-eslint/no-type-alias': 0,
      '@typescript-eslint/no-unnecessary-condition': 0,
      '@typescript-eslint/no-unsafe-assignment': 0,
      '@typescript-eslint/no-unsafe-member-access': 0,
      '@typescript-eslint/no-unsafe-return': 0,
      '@typescript-eslint/prefer-ts-expect-error': 0,
      '@typescript-eslint/restrict-plus-operands': 0,
      '@typescript-eslint/sort-type-union-intersection-members': 0,
      '@typescript-eslint/unbound-method': 0,
      'accessor-pairs': 0,
      'no-magic-numbers': 0,
      'no-negated-condition': 0, // not auto-fixable
      'promise/always-return': 0,
      'promise/catch-or-return': 0,
      'unicorn-x/explicit-length-check': 0,
      'unicorn-x/no-array-for-each': 0,
      'unicorn-x/no-fn-reference-in-iterator': 0,
      'unicorn-x/prefer-number-properties': 0,
      'unicorn-x/prefer-prototype-methods': 0,
      'unicorn-x/prefer-spread': 0,
    },
  },
])
