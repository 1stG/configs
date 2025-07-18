// @ts-check

/**
 * @typedef {Plugin_ & { default?: Plugin_ }} Plugin
 * @import { Config, Plugin as Plugin_ } from 'prettier'
 */

import { createRequire } from 'node:module'

import { iniRcFiles, jsoncFiles, nonJsonRcFiles, shRcFiles } from '@1stg/config'
import prettier from 'prettier'

const require = createRequire(import.meta.url)

const [major, minor] = prettier.version.split('.')

const majorVersion = Number.parseInt(major, 10)
const minorVersion = Number.parseInt(minor, 10)

const dependencies = Object.keys(require('./package.json').dependencies).filter(
  pkgName =>
    /\bprettier\b/.test(pkgName) &&
    (pkgName !== 'prettier-plugin-jsdoc' ||
      (majorVersion == 3 && minorVersion < 2 * 3)),
)

/** @type {Plugin[]} */
let plugins

try {
  plugins = dependencies.map(pkgName => {
    /** @type {Plugin} */
    const pkg = require(pkgName)
    return pkg.default || pkg
  })
} catch {
  plugins = await Promise.all(
    dependencies.map(async pkgName => {
      /** @type {Plugin} */
      const pkg = await import(pkgName)
      return pkg.default || pkg
    }),
  )
}

/** @type {Config} */
export default {
  arrowParens: 'avoid',
  semi: false,
  singleAttributePerLine: true,
  singleQuote: true,
  trailingComma: 'all',
  xmlWhitespaceSensitivity: 'ignore',
  plugins,
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
    {
      files: ['**/*.{ts,tsx}'],
      options: {
        parser: 'typescript',
      },
    },
  ],
}
