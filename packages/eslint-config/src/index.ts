import type { Linter } from 'eslint'
import oxlint from 'eslint-plugin-oxlint'

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
  /** Lint JS/TS/JSX as well, with only rules Oxlint does not cover. @default installed `typescript-eslint` */
  code?: boolean
  /** Extra ignore patterns. */
  ignores?: string[]
}

interface PluginConfigs {
  configs: Record<string, Linter.Config | Linter.Config[]>
}

interface MarkdownPlugin {
  flat: Linter.Config
  createRemarkProcessor: (options: { lintCodeBlocks: boolean }) => Linter.Processor
}

const NODE_MAJOR = Number(process.versions.node.split('.')[0])

const CODE_IGNORES = '**/*.{cjs,cts,js,jsx,mjs,mts,ts,tsx}'

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
  CODE_IGNORES,
  '**/*.vue',
  '**/*.{css,less,sass,scss,styl,stylus}',
  '**/*.html',
]

/**
 * Check whether an optional peer plugin is installed.
 */
const toConfigs = (config: Linter.Config | Linter.Config[]): Linter.Config[] =>
  Array.isArray(config) ? config : [config]

const withCodeFiles = (config: Linter.Config): Linter.Config => ({
  ...config,
  files: config.files ?? [CODE_IGNORES],
})

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
  code = isInstalled('typescript-eslint'),
  markup = NODE_MAJOR >= 24 && isInstalled('eslint-plugin-markup'),
  ignores = [],
}: EslintConfigOptions = {}): Promise<Linter.Config[]> => {
  const defaultIgnores = DEFAULT_IGNORES.filter(
    pattern => (!markup || pattern !== '**/*.html') && (!code || pattern !== CODE_IGNORES),
  )

  const configs: Linter.Config[] = [{ ignores: [...defaultIgnores, ...ignores] }]

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

  if (code) {
    if (!isInstalled('typescript-eslint')) {
      /* istanbul ignore next -- defensive guard for explicit code: true */
      throw new Error('@1stg/eslint-config: `code` requires the `typescript-eslint` package')
    }

    const tseslint = await load<{
      configs: { recommended: Linter.Config[] }
    }>('typescript-eslint')
    configs.push(...tseslint.configs.recommended.map(withCodeFiles))

    if (isInstalled('eslint-plugin-sonarjs')) {
      const sonarjs = await load<PluginConfigs>('eslint-plugin-sonarjs')
      configs.push(...toConfigs(sonarjs.configs.recommended).map(withCodeFiles))
    }

    if (isInstalled('eslint-plugin-regexp')) {
      const regexp = await load<PluginConfigs>('eslint-plugin-regexp')
      configs.push(...toConfigs(regexp.configs['flat/recommended']).map(withCodeFiles))
    }
  }

  configs.push(...toConfigs(oxlint.configs['flat/all']))

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
      ...toConfigs(jsonc.configs['flat/recommended-with-jsonc']),
      ...toConfigs(jsonc.configs['flat/prettier']),
    )
  }

  if (yaml) {
    const yml = await load<PluginConfigs>('eslint-plugin-yml')
    configs.push(
      ...toConfigs(yml.configs['flat/recommended']),
      ...toConfigs(yml.configs['flat/prettier']),
    )
  }

  if (tomlEnabled) {
    const toml = await load<PluginConfigs>('eslint-plugin-toml')
    configs.push(...toConfigs(toml.configs['flat/recommended']))
  }

  return configs
}

export default defineConfig()
