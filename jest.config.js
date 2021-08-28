module.exports = {
  preset: 'ts-jest/presets/js-with-babel',
  testRegex: [/.*\.(spec|test)\.[jt]sx?$/],
  resolver: '<rootDir>/tests/resolver.js',
}
