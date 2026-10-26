import { fileURLToPath } from 'node:url'

import { iniRcFiles, jsoncFiles, nonJsonRcFiles, shRcFiles } from '@1stg/config'
import type { Config, Plugin } from 'prettier'

/**
 * The plugin list is explicit, and only resolves each plugin's entry point:
 * the plugin modules themselves are imported by Prettier when it first needs
 * their languages, instead of at config load time.
 */
const PLUGIN_NAMES = [
  '@prettier/plugin-pug',
  '@prettier/plugin-ruby',
  '@prettier/plugin-xml',
  'prettier-plugin-go-template',
  'prettier-plugin-ini',
  'prettier-plugin-jsdoc',
  'prettier-plugin-jsdoc-type',
  'prettier-plugin-pkg',
  'prettier-plugin-properties',
  'prettier-plugin-sh',
  'prettier-plugin-stylus',
  'prettier-plugin-toml',
]

const plugins: string[] = PLUGIN_NAMES.map(name =>
  fileURLToPath(import.meta.resolve(name)),
)

export interface PrettierConfigOptions {
  /** Print semicolons. @default false */
  semi?: boolean
  /** Use single quotes instead of double quotes. @default true */
  singleQuote?: boolean
  /** Use that framework's HTML parser for `*.html`. */
  framework?: 'angular' | 'vue'
  /** Parse TS/TSX with `babel-ts`, as Next.js does. @default false */
  nextjs?: boolean
}

export const defineConfig = ({
  framework,
  nextjs = false,
  semi = false,
  singleQuote = true,
}: PrettierConfigOptions = {}): Config => {
  const overrides: NonNullable<Config['overrides']> = [
    { files: iniRcFiles, options: { parser: 'ini' } },
    { files: jsoncFiles, options: { parser: 'json' } },
    {
      files: ['**/.*rc', '**/*.json'],
      excludeFiles: [...nonJsonRcFiles, ...jsoncFiles],
      options: { parser: 'json-stringify' },
    },
    { files: shRcFiles, options: { parser: 'sh' } },
    {
      files: ['**/.changeset/*.md'],
      excludeFiles: ['README.md'],
      options: { singleQuote: false },
    },
    { files: ['**/*.{ts,tsx}'], options: { parser: 'typescript' } },
  ]

  if (framework === 'angular') {
    overrides.push({ files: '*.html', options: { parser: 'angular' } })
  } else if (framework === 'vue') {
    overrides.push({ files: '*.html', options: { parser: 'vue' } })
  }

  if (nextjs) {
    overrides.push({
      files: ['*.ts', '*.tsx'],
      options: { parser: 'babel-ts' },
    })
  }

  return {
    arrowParens: 'avoid',
    plugins: plugins as Array<string | Plugin>,
    semi,
    singleAttributePerLine: true,
    singleQuote,
    trailingComma: 'all',
    xmlWhitespaceSensitivity: 'ignore',
    overrides,
  }
}

export default defineConfig()
