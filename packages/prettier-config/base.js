const {
  iniRcFiles,
  jsoncFiles,
  nonJsonRcFiles,
  shRcFiles,
} = require('@1stg/config')

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
      files: iniRcFiles,
      options: {
        parser: 'ini',
      },
    },
    {
      files: jsoncFiles,
      options: {
        parser: 'json',
      },
    },
    {
      files: ['.*rc', '*.json'],
      excludeFiles: [...nonJsonRcFiles, ...jsoncFiles],
      options: {
        parser: 'json-stringify',
      },
    },
    {
      files: shRcFiles,
      options: {
        parser: 'sh',
      },
    },
  ],
}
