import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

import { iniRcFiles, jsoncFiles, nonJsonRcFiles, shRcFiles } from '@1stg/config'
import type { Config } from 'prettier'

interface PackageManifest {
  dependencies?: Record<string, string>
  peerDependencies?: Record<string, string>
}

const manifest = JSON.parse(
  readFileSync(new URL('../package.json', import.meta.url), 'utf8'),
) as PackageManifest

const PLUGIN_NAMES = [
  ...new Set([
    ...Object.keys(manifest.dependencies ?? {}),
    ...Object.keys(manifest.peerDependencies ?? {}),
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
  /** Use the Angular or Vue HTML parser for `*.html`. */
  framework?: 'angular' | 'vue'
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

  if (framework === 'angular') {
    defaultOverrides.push({
      files: '*.html',
      options: { parser: 'angular' },
    })
  } else if (framework === 'vue') {
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
