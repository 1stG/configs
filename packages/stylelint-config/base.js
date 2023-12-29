const { preferPrettier } = require('@1stg/config')
const { isPkgAvailable } = require('@pkgr/core')

const isAngularAvailable = isPkgAvailable('@angular/core')
const isVueAvailable = isPkgAvailable('vue')

module.exports = {
  extends: [
    'stylelint-config-standard',
    preferPrettier
      ? 'stylelint-config-prettier'
      : 'stylelint-prettier/recommended',
  ],
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
      '^[a-z]([\\da-z-]+)?(__([\\da-z]+-?)+)?(--([\\da-z]+-?)+){0,2}$',
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
