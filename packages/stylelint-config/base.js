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
