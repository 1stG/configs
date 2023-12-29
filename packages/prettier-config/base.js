import { createRequire } from 'node:module'

import config from '@1stg/config'

const { iniRcFiles, jsoncFiles, nonJsonRcFiles, shRcFiles } = config

const require = createRequire(import.meta.url)

/**
 * @type {import('prettier').Config}
 */
export default {
  arrowParens: 'avoid',
  semi: false,
  singleAttributePerLine: true,
  singleQuote: true,
  trailingComma: 'all',
  xmlWhitespaceSensitivity: 'ignore',
  svelteIndentScriptAndStyle: false, // align with default option of `vueIndentScriptAndStyle`
  plugins: await Promise.all(
    Object.keys(require('./package.json').dependencies).map(pkg => import(pkg)),
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
