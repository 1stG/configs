let isAngularAvailable

try {
  // eslint-disable-next-line node/no-extraneous-require
  require.resolve('@angular/core')
  isAngularAvailable = true
} catch (e) {}

module.exports = {
  extends: ['stylelint-config-standard'],
  plugins: [
    'stylelint-high-performance-animation',
    'stylelint-no-unsupported-browser-features',
  ],
  rules: Object.assign(
    {
      'plugin/no-low-performance-animation-properties': true,
      'plugin/no-unsupported-browser-features': true,
      'selector-pseudo-element-colon-notation': 'single',
    },
    isAngularAvailable && {
      'selector-pseudo-element-no-unknown': [
        true,
        {
          ignorePseudoElements: ['ng-deep'],
        },
      ],
    },
  ),
}
