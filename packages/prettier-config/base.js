module.exports = {
  arrowParens: 'avoid',
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  xmlWhitespaceSensitivity: 'ignore',
  overrides: [
    {
      files: ['.*rc', '*.json'],
      options: {
        parser: 'json-stringify',
      },
    },
    {
      files: ['.bashrc', '.cshrc', '.zshrc'],
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
