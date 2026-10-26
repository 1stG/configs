import { createRequire } from 'node:module'

import type { Linter } from 'eslint'

const require = createRequire(import.meta.url)

export interface EslintConfigOptions {
  /** Lint Markdown/MDX. @default true */
  markdown?: boolean
  /** Lint JSON/JSONC/JSON5. @default true */
  jsonc?: boolean
  /** Lint YAML. @default true */
  yaml?: boolean
  /** Lint TOML. @default true */
  toml?: boolean
  /** Disable the rules Oxlint already implements. @default true */
  oxlint?: boolean
  /** Extra ignore patterns. */
  ignores?: string[]
}

const DEFAULT_IGNORES = [
  '**/.dsh/**',
  '**/.yarn/**',
  '**/CHANGELOG.md',
  '**/coverage/**',
  '**/lib/**',
]

/**
 * Build the flat ESLint config for the file types Oxlint does not parse.
 *
 * Every plugin is required only when its option is enabled; Oxlint keeps
 * ownership of JS/TS/JSX/Vue.
 */
export const defineConfig = ({
  markdown = true,
  jsonc: jsoncEnabled = true,
  yaml = true,
  toml: tomlEnabled = true,
  oxlint: oxlintEnabled = true,
  ignores = [],
}: EslintConfigOptions = {}): Linter.Config[] => {
  const configs: Linter.Config[] = [
    { ignores: [...DEFAULT_IGNORES, ...ignores] },
  ]

  if (oxlintEnabled) {
    const oxlint = require('eslint-plugin-oxlint') as {
      configs: Record<string, Linter.Config[]>
    }
    configs.push(...oxlint.configs['flat/all'])
  }

  if (markdown) {
    const mdx = require('eslint-plugin-mdx') as {
      flat: Linter.Config
      createRemarkProcessor: (options: {
        lintCodeBlocks: boolean
      }) => Linter.Processor
    }
    configs.push({
      ...mdx.flat,
      processor: mdx.createRemarkProcessor({ lintCodeBlocks: false }),
    })
  }

  if (jsoncEnabled) {
    const jsonc = require('eslint-plugin-jsonc') as {
      configs: Record<string, Linter.Config[]>
    }
    configs.push(
      ...jsonc.configs['flat/recommended-with-jsonc'],
      ...jsonc.configs['flat/prettier'],
    )
  }

  if (yaml) {
    const yml = require('eslint-plugin-yml') as {
      configs: Record<string, Linter.Config[]>
    }
    configs.push(
      ...yml.configs['flat/recommended'],
      ...yml.configs['flat/prettier'],
    )
  }

  if (tomlEnabled) {
    const toml = require('eslint-plugin-toml') as {
      configs: Record<string, Linter.Config[]>
    }
    configs.push(...toml.configs['flat/recommended'])
  }

  return configs
}

export default defineConfig()
