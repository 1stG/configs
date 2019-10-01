module.exports = {
  htmlWhitespaceSensitivity: 'ignore',
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  overrides: [
    {
      files: ['.*rc', '*.json'],
      options: {
        parser: 'json-stringify',
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
