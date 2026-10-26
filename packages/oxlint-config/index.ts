export type OxlintCategory =
  | 'correctness'
  | 'suspicious'
  | 'pedantic'
  | 'perf'
  | 'style'
  | 'restriction'
  | 'nursery'

export interface OxlintConfigOptions {
  /** Enabled categories. @default ['correctness'] */
  categories?: OxlintCategory[]
  /** Enable Jest globals and rules. @default false */
  jest?: boolean
  /** Enable the JSDoc plugin. @default true */
  jsdoc?: boolean
  /** ESLint plugins to load through Oxlint's `jsPlugins` (alpha). */
  jsPlugins?: string[]
  /** Enable Node.js globals and rules. @default true */
  node?: boolean
  /** Enable the Promise plugin. @default true */
  promise?: boolean
  /** Enable React and JSX accessibility rules. @default false */
  react?: boolean
  /** Extra rule overrides. */
  rules?: Record<string, unknown>
  /** Enable Vitest globals and rules. @default false */
  vitest?: boolean
  /** Enable Vue rules. @default false */
  vue?: boolean
  /** Extra ignore patterns. */
  ignores?: string[]
}

/**
 * Build an Oxlint configuration. Oxlint discovers `oxlint.config.ts`
 * automatically; pass `--config` only for a custom file name.
 */
export const defineConfig = ({
  categories = ['correctness'],
  jest = false,
  jsdoc = true,
  jsPlugins = [],
  node = true,
  promise = true,
  react = false,
  rules = {},
  vitest = false,
  vue = false,
  ignores = [],
}: OxlintConfigOptions = {}): Record<string, unknown> => ({
  plugins: [
    'oxc',
    'unicorn',
    'typescript',
    'import',
    ...(promise ? ['promise'] : []),
    ...(jsdoc ? ['jsdoc'] : []),
    ...(node ? ['node'] : []),
    ...(react ? ['react', 'jsx-a11y'] : []),
    ...(vue ? ['vue'] : []),
    ...(vitest ? ['vitest'] : []),
    ...(jest ? ['jest'] : []),
  ],
  ...(jsPlugins.length > 0 && { jsPlugins }),
  categories: Object.fromEntries(
    categories.map(category => [category, 'error']),
  ),
  env: {
    builtin: true,
    ...(node && { node: true }),
    ...(react && { browser: true }),
    ...(vue && { vue: true }),
    ...(vitest && { vitest: true }),
    ...(jest && { jest: true }),
  },
  rules: {
    // Formatting-adjacent rules are left to Oxfmt, which also sorts imports.
    curly: ['error', 'all'],
    eqeqeq: ['error', 'always'],
    'no-else-return': ['error', { allowElseIf: false }],
    'no-empty': ['error', { allowEmptyCatch: true }],
    'no-var': 'error',
    'object-shorthand': 'error',
    'prefer-const': ['error', { destructuring: 'all' }],
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'typescript/consistent-type-definitions': ['error', 'interface'],
    'typescript/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
    'unicorn/prefer-node-protocol': 'error',
    'unicorn/prefer-number-properties': 'error',
    'unicorn/prefer-string-starts-ends-with': 'error',
    ...rules,
  },
  overrides: [
    {
      files: ['**/*.d.{ts,mts,cts}', '**/*.d.*.{ts,mts,cts}'],
      rules: {
        'typescript/no-explicit-any': 'off',
        'typescript/no-unused-vars': 'off',
        'import/no-duplicates': 'off',
      },
    },
  ],
  ignorePatterns: [
    '**/.dsh',
    '**/.history',
    '**/.type-coverage',
    '**/.vercel',
    '**/.yarn',
    '**/coverage',
    '**/dist',
    '**/lib',
    '**/CHANGELOG.md',
    '**/*.log',
    '**/*.patch',
    ...ignores,
  ],
})

export default defineConfig()
