import type { Linter } from 'eslint'

export interface EslintConfigOptions {
  /** Lint Markdown/MDX. @default true */
  markdown?: boolean
  /** Lint JSON/JSONC/JSON5. @default true */
  jsonc?: boolean
  /** Lint YAML. @default true */
  yaml?: boolean
  /** Lint TOML. @default true */
  toml?: boolean
  /** Lint HTML with `eslint-plugin-markup` on Node >= 24. @default auto */
  markup?: boolean
  /** Disable the rules Oxlint already implements. @default true */
  oxlint?: boolean
  /** Extra ignore patterns. */
  ignores?: string[]
}

interface PluginConfigs {
  configs: Record<string, Linter.Config[]>
}

interface MarkdownPlugin {
  flat: Linter.Config
  createRemarkProcessor: (options: {
    lintCodeBlocks: boolean
  }) => Linter.Processor
}

const NODE_MAJOR = Number(process.versions.node.split('.')[0])

const DEFAULT_IGNORES = [
  '**/.dsh/**',
  '**/.history/**',
  '**/.type-coverage/**',
  '**/.vercel/**',
  '**/.yarn/**',
  '**/.pnp.*',
  '**/coverage/**',
  '**/dist/**',
  '**/lib/**',
  '**/node_modules/**',
  '**/CHANGELOG.md',
  '**/yarn.lock',
  '**/package-lock.json',
  '**/pnpm-lock.yaml',
  '**/auto-imports.d.ts',
  '**/*.log',
  '**/*.patch',
  '**/*.min.*',
  // Oxlint owns code; stylelint owns styles; markuplint owns HTML.
  '**/*.{cjs,cts,js,jsx,mjs,mts,ts,tsx,vue}',
  '**/*.{css,less,sass,scss,styl,stylus}',
  '**/*.html',
]

/**
 * Check whether an optional peer plugin is installed.
 */
const isInstalled = (name: string): boolean => {
  try {
    return Boolean(import.meta.resolve(name))
  } catch {
    return false
  }
}

/**
 * Dynamic import that also unwraps a CommonJS default export.
 */
const load = async <T>(name: string): Promise<T> => {
  const mod = (await import(name)) as T & { default?: T }
  return (mod.default ?? mod) as T
}

/**
 * Build the flat ESLint config for the file types Oxlint does not parse.
 *
 * Every plugin is imported dynamically (and only when its option is enabled),
 * so the config works with ESM-only plugins. ESLint awaits the returned
 * promise before linting.
 */
export const defineConfig = async ({
  markdown = true,
  jsonc: jsoncEnabled = true,
  yaml = isInstalled('eslint-plugin-yml'),
  toml: tomlEnabled = isInstalled('eslint-plugin-toml'),
  oxlint: oxlintEnabled = true,
  markup = NODE_MAJOR >= 24 && isInstalled('eslint-plugin-markup'),
  ignores = [],
}: EslintConfigOptions = {}): Promise<Linter.Config[]> => {
  const defaultIgnores = markup
    ? DEFAULT_IGNORES.filter(pattern => pattern !== '**/*.html')
    : DEFAULT_IGNORES

  const configs: Linter.Config[] = [
    { ignores: [...defaultIgnores, ...ignores] },
  ]

  if (markup) {
    if (NODE_MAJOR < 24) {
      throw new Error(
        '@1stg/eslint-config: `markup` requires Node.js >= 24 (eslint-plugin-markup@2)',
      )
    }

    const markupPlugin = await load<{
      configs: { flatRecommended: Linter.Config }
    }>('eslint-plugin-markup')
    configs.push(markupPlugin.configs.flatRecommended)
  }

  if (oxlintEnabled) {
    const oxlint = await load<PluginConfigs>('eslint-plugin-oxlint')
    configs.push(...oxlint.configs['flat/all'])
  }

  if (markdown) {
    const mdx = await load<MarkdownPlugin>('eslint-plugin-mdx')
    configs.push({
      ...mdx.flat,
      processor: mdx.createRemarkProcessor({ lintCodeBlocks: false }),
    })
  }

  if (jsoncEnabled) {
    const jsonc = await load<PluginConfigs>('eslint-plugin-jsonc')
    configs.push(
      ...jsonc.configs['flat/recommended-with-jsonc'],
      ...jsonc.configs['flat/prettier'],
    )
  }

  if (yaml) {
    const yml = await load<PluginConfigs>('eslint-plugin-yml')
    configs.push(
      ...yml.configs['flat/recommended'],
      ...yml.configs['flat/prettier'],
    )
  }

  if (tomlEnabled) {
    const toml = await load<PluginConfigs>('eslint-plugin-toml')
    configs.push(...toml.configs['flat/recommended'])
  }

  return configs
}

export default defineConfig()
