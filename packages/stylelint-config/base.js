const rules = {
  'plugin/no-low-performance-animation-properties': true,
  'selector-pseudo-element-colon-notation': 'single',
}

let angular = false

try {
  // eslint-disable-next-line node/no-missing-require
  require.resolve('@angular/core')
  angular = true
} catch (e) {}

if (angular) {
  Object.assign(rules, {
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['ng-deep'],
      },
    ],
  })
}

module.exports = {
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-high-performance-animation'],
  rules,
}
