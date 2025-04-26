// @ts-check

/**
 * @typedef {Plugin_ & { default?: Plugin_ }} Plugin
 * @import { Config, Plugin as Plugin_ } from 'prettier'
 */

import { createRequire } from 'node:module'

import { iniRcFiles, jsoncFiles, nonJsonRcFiles, shRcFiles } from '@1stg/config'

const require = createRequire(import.meta.url)

/** @type {Config} */
export default {
  arrowParens: 'avoid',
  semi: false,
  singleAttributePerLine: true,
  singleQuote: true,
  trailingComma: 'all',
  xmlWhitespaceSensitivity: 'ignore',
  plugins: await Promise.all(
    Object.keys(require('./package.json').dependencies)
      .filter(pkgName => /\bprettier\b/.test(pkgName))
      .map(async pkgName => {
        /** @type {Plugin} */
        const pkg = await import(pkgName)
        return pkg.default || pkg
      }),
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
      files: ['**/.*rc', '**/*.json'],
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
    {
      files: ['**/.changeset/*.md'],
      excludeFiles: ['README.md'],
      options: {
        singleQuote: false,
      },
    },
  ],
}
