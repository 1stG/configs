module.exports = {
  arrowParens: 'avoid',
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  xmlWhitespaceSensitivity: 'ignore',
  svelteIndentScriptAndStyle: false, // align with default option of `vueIndentScriptAndStyle`
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
        'tslint.json',
        'tslint.*.json',
      ],
      options: {
        parser: 'json',
      },
    },
  ],
}
