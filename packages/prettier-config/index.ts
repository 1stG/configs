import { fileURLToPath } from 'node:url'

import { iniRcFiles, jsoncFiles, nonJsonRcFiles, shRcFiles } from '@1stg/config'
import pkg from '@1stg/prettier-config/package.json' with { type: 'json' }
import type { Config } from 'prettier'

const PLUGIN_NAMES = [
  ...new Set([
    ...Object.keys(pkg.dependencies ?? {}),
    ...Object.keys(pkg.peerDependencies ?? {}),
  ]),
]
  .filter(
    name =>
      name === 'prettier-plugin-pkg' ||
      name.startsWith('prettier-plugin-') ||
      name.startsWith('@prettier/plugin-'),
  )
  .sort()

const resolvePlugins = (): string[] => {
  const plugins: string[] = []

  for (const name of PLUGIN_NAMES) {
    try {
      plugins.push(fileURLToPath(import.meta.resolve(name)))
    } catch {
      // Optional peer, not installed by this consumer.
    }
  }

  return plugins
}

export interface PrettierConfigOptions extends Config {
  /** Use the Vue HTML parser for `*.html`. */
  framework?: 'vue'
}

export const defineConfig = ({
  framework,
  plugins = resolvePlugins(),
  overrides = [],
  ...options
}: PrettierConfigOptions = {}): Config => {
  const defaultOverrides: NonNullable<Config['overrides']> = [
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

  if (framework === 'vue') {
    defaultOverrides.push({ files: '*.html', options: { parser: 'vue' } })
  }

  return {
    arrowParens: 'avoid',
    semi: false,
    singleAttributePerLine: true,
    singleQuote: true,
    trailingComma: 'all',
    xmlWhitespaceSensitivity: 'ignore',
    ...options,
    plugins,
    overrides: [...defaultOverrides, ...overrides],
  }
}

export default defineConfig()
