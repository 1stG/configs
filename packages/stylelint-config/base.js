module.exports = {
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-high-performance-animation'],
  rules: {
    'plugin/no-low-performance-animation-properties': true,
  },
}
