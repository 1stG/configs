module.exports = {
  arrowParens: 'avoid',
  semi: false,
  singleAttributePerLine: true,
  singleQuote: true,
  trailingComma: 'all',
  xmlWhitespaceSensitivity: 'ignore',
  svelteIndentScriptAndStyle: false, // align with default option of `vueIndentScriptAndStyle`
  /**
   * Workaround for pnpm, see also @see https://github.com/prettier/prettier/issues/8474
   */
  plugins: Object.keys(require('./package.json').dependencies).map(pkg =>
    require(pkg),
  ),
  overrides: [
    {
      files: ['.*rc', '*.json'],
      options: {
        parser: 'json-stringify',
      },
    },
    {
      files: ['.browserslistrc', '.npmrc', '.yarnrc'],
      options: {
        parser: 'sh',
      },
    },
    {
      files: [
        'angular.json',
        'jsconfig.json',
        'settings.json',
        'tsconfig.json',
        'tsconfig.*.json',
      ],
      options: {
        parser: 'json',
      },
    },
  ],
}
