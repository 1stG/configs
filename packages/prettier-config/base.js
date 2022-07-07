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
      excludeFiles: ['*.code-workspace', '.nvmrc', '.vscode/*.json'],
      options: {
        parser: 'json-stringify',
      },
    },
    {
      files: ['.browserslistrc', '.npmrc', '.yarnrc', '.*shrc'],
      options: {
        parser: 'sh',
      },
    },
    {
      files: [
        '*.code-workspace',
        'angular.json',
        'jsconfig.json',
        'tsconfig.json',
        'tsconfig.*.json',
        '.vscode/*.json',
      ],
      options: {
        parser: 'json',
      },
    },
  ],
}
