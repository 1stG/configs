import { preferPrettier } from '@1stg/config'
import { isPkgAvailable } from '@pkgr/core'

const isAngularAvailable = isPkgAvailable('@angular/core')
const isVueAvailable = isPkgAvailable('vue')

/**
 * @type {Config}
 * @import { Config } from 'stylelint'
 */
const base = {
  extends: [
    'stylelint-config-standard',
    !preferPrettier && 'stylelint-prettier/recommended',
  ].filter(Boolean),
  plugins: [
    'stylelint-high-performance-animation',
    'stylelint-no-unsupported-browser-features',
  ],
  rules: {
    'at-rule-empty-line-before': null,
    'plugin/no-low-performance-animation-properties': true,
    'plugin/no-unsupported-browser-features': [
      true,
      {
        ignore: ['css3-cursors', 'css-media-resolution', 'css-resize', 'rem'],
        severity: 'warning',
      },
    ],
    'selector-attribute-quotes': null,
    'selector-class-pattern': [
      String.raw`^[a-z]([\da-z-]+)?(__([\da-z]+-?)+)?(--([\da-z]+-?)+){0,2}$`,
      {
        message: 'Expected class selector to be kebab-case or BEM',
        resolveNestedSelectors: true,
      },
    ],
    'selector-pseudo-element-colon-notation': 'single',
    ...((isAngularAvailable || isVueAvailable) && {
      'selector-pseudo-element-no-unknown': [
        true,
        {
          ignorePseudoElements: [
            isAngularAvailable && 'ng-deep',
            isVueAvailable && ['v-deep', 'v-global', 'v-slotted'],
          ]
            .filter(Boolean)
            .flat(),
        },
      ],
    }),
  },
}

export default base
