import { isPkgAvailable } from '@pkgr/utils'
import type { OxlintConfig } from 'oxlint'

export interface OxlintConfigOptions extends OxlintConfig {
  /** Enable the JSDoc plugin. @default true */
  jsdoc?: boolean
  /** Enable Node.js globals and rules. @default true */
  node?: boolean
  /** Enable the Promise plugin. @default true */
  promise?: boolean
  /** Enable React and JSX accessibility rules. @default false */
  react?: boolean
  /** Enable Vue rules. @default false */
  vue?: boolean
  /** Enable Vitest globals and rules. @default false */
  vitest?: boolean
  /** Enable Jest globals and rules. @default false */
  jest?: boolean
}

/**
 * Build an Oxlint configuration. Oxlint discovers `oxlint.config.ts`
 * automatically; pass `--config` only for a custom file name.
 */
export const defineConfig = ({
  categories = { correctness: 'error' },
  jest = isPkgAvailable('jest'),
  jsdoc = true,
  node = true,
  promise = true,
  react = isPkgAvailable('react'),
  vitest = isPkgAvailable('vitest'),
  vue = isPkgAvailable('vue'),
  plugins: extraPlugins = [],
  env: extraEnv,
  rules: extraRules,
  overrides: extraOverrides,
  ignorePatterns: extraIgnorePatterns,
  ...options
}: OxlintConfigOptions = {}): OxlintConfig => {
  const plugins: NonNullable<OxlintConfig['plugins']> = [
    'oxc',
    'unicorn',
    'typescript',
    'import',
  ]

  if (promise) {
    plugins.push('promise')
  }
  if (jsdoc) {
    plugins.push('jsdoc')
  }
  if (node) {
    plugins.push('node')
  }
  if (react) {
    plugins.push('react', 'jsx-a11y')
  }
  if (vue) {
    plugins.push('vue')
  }
  if (vitest) {
    plugins.push('vitest')
  }
  if (jest) {
    plugins.push('jest')
  }
  plugins.push(...(extraPlugins ?? []))

  return {
    ...options,
    plugins,
    categories,
    env: {
      builtin: true,
      ...(node && { node: true }),
      ...(react && { browser: true }),
      ...(vue && { vue: true }),
      ...(vitest && { vitest: true }),
      ...(jest && { jest: true }),
      ...extraEnv,
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
      ...extraRules,
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
      ...(extraOverrides ?? []),
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
      ...(extraIgnorePatterns ?? []),
    ],
  }
}

export default defineConfig()
