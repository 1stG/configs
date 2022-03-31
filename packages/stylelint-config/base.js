const { isAngularAvailable, isVueAvailable } = require('@pkgr/utils')

module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-prettier/recommended'],
  plugins: [
    'stylelint-high-performance-animation',
    'stylelint-no-unsupported-browser-features',
  ],
  rules: {
    'plugin/no-low-performance-animation-properties': true,
    'plugin/no-unsupported-browser-features': [
      true,
      {
        ignore: ['css3-cursors', 'css-resize', 'rem'],
        severity: 'warning',
      },
    ],
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
