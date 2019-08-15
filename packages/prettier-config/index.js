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
        'jsconfig.json',
        'tsconfig.json',
        'tsconfig.*.json',
        'tslint.json',
      ],
      options: {
        parser: 'json',
      },
    },
  ],
}
