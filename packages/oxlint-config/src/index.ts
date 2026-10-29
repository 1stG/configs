import { isPkgAvailable } from '@pkgr/utils'
import type { OxlintConfig } from 'oxlint'

type OxlintRules = NonNullable<OxlintConfig['rules']>
type NoMagicNumbersRule = NonNullable<OxlintRules['no-magic-numbers']>
type NoMagicNumbersOptions = Extract<NoMagicNumbersRule, [unknown, unknown]>[1]

const DEFAULT_MAGIC_NUMBERS = [
  -1, 0, 1, 2, 3, 5, 7, 10, 12, 15, 20, 24, 30, 31, 50, 60, 100, 365, 366, 500, 1000, 1024, 3600,
]

const DEFAULT_NO_MAGIC_NUMBERS_OPTIONS = {
  enforceConst: true,
  ignoreArrayIndexes: true,
  ignoreClassFieldInitialValues: true,
  ignoreDefaultValues: true,
  ignoreEnums: true,
  ignoreNumericLiteralTypes: true,
  ignoreReadonlyClassProperties: true,
  ignoreTypeIndexes: true,
} as const

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
  /** Enable rules that require type information. @default installed `oxlint-tsgolint` */
  typeAware?: boolean
  /** Options merged into `no-magic-numbers`; `false` disables the rule. */
  noMagicNumbers?: false | NoMagicNumbersOptions
}

/**
 * Build an Oxlint configuration. Oxlint discovers `oxlint.config.ts`
 * automatically; pass `--config` only for a custom file name.
 */
export const defineConfig = ({
  categories = { correctness: 'error', perf: 'warn' },
  jest = isPkgAvailable('jest'),
  typeAware = isPkgAvailable('oxlint-tsgolint/package.json'),
  noMagicNumbers,
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
  const plugins: NonNullable<OxlintConfig['plugins']> = ['oxc', 'unicorn', 'typescript', 'import']

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
    plugins.push('react', 'jsx-a11y', 'react-perf')
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
  plugins.push(...extraPlugins)

  const noMagicNumbersRule: NoMagicNumbersRule =
    noMagicNumbers === false
      ? 'off'
      : ([
          'error',
          {
            ...DEFAULT_NO_MAGIC_NUMBERS_OPTIONS,
            ...noMagicNumbers,
            ignore: [...new Set([...DEFAULT_MAGIC_NUMBERS, ...(noMagicNumbers?.ignore ?? [])])],
          },
        ] as NoMagicNumbersRule)

  return {
    ...options,
    options: {
      ...options.options,
      ...(typeAware && { typeAware: true }),
    },
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
      ...(typeAware && {
        'typescript/await-thenable': 'error',
        'typescript/no-deprecated': 'error',
        'typescript/no-floating-promises': 'error',
        'typescript/no-misused-promises': 'error',
        'typescript/no-unnecessary-condition': 'error',
        'typescript/no-unnecessary-qualifier': 'error',
        'typescript/no-unnecessary-type-arguments': 'error',
        'typescript/prefer-optional-chain': 'error',
        'typescript/prefer-readonly': 'error',
        'typescript/prefer-reduce-type-parameter': 'error',
        'typescript/require-array-sort-compare': ['error', { ignoreStringArrays: true }],
        'typescript/restrict-plus-operands': 'error',
      }),
      'arrow-body-style': 'error',
      curly: ['error', 'all'],
      eqeqeq: ['error', 'always'],
      'no-case-declarations': 'error',
      'no-else-return': ['error', { allowElseIf: false }],
      'no-empty': ['error', { allowEmptyCatch: true }],
      'no-empty-function': 'error',
      'no-fallthrough': 'error',
      'no-magic-numbers': noMagicNumbersRule,
      'no-negated-condition': 'error',
      'no-prototype-builtins': 'error',
      'no-redeclare': 'error',
      'no-regex-spaces': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      'prefer-const': ['error', { destructuring: 'all' }],
      'prefer-object-spread': 'error',
      'prefer-regex-literals': 'error',
      'preserve-caught-error': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
      'typescript/consistent-type-definitions': ['error', 'interface'],
      'typescript/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
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
