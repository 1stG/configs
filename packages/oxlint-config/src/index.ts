import { isPkgAvailable } from '@pkgr/utils'
import type { OxlintConfig } from 'oxlint'

type OxlintRules = NonNullable<OxlintConfig['rules']>
type OxlintRuleConfig = NonNullable<OxlintRules[keyof OxlintRules]>
type NoMagicNumbersRule = NonNullable<OxlintRules['no-magic-numbers']>

const DEFAULT_MAGIC_NUMBERS = [
  -1, 0, 1, 2, 3, 5, 7, 10, 12, 15, 20, 24, 30, 31, 50, 60, 100, 365, 366, 500, 768, 1000, 1024,
  3600, 4200, 8080,
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

const mergeNoMagicNumbers = (
  base: OxlintRuleConfig,
  override: OxlintRuleConfig,
): OxlintRuleConfig => {
  if (override === 'off' || override === 0) {
    return override
  }

  const baseOptions =
    Array.isArray(base) && typeof base[1] === 'object' && base[1] !== null
      ? (base[1] as Record<string, unknown>)
      : {}

  if (!Array.isArray(override)) {
    return [override, baseOptions] as OxlintRuleConfig
  }

  const [severity, options] = override

  if (!options || typeof options !== 'object') {
    return override
  }

  const overrideOptions = options as Record<string, unknown>
  const baseIgnore = Array.isArray(baseOptions.ignore) ? baseOptions.ignore : []
  const overrideIgnore = Array.isArray(overrideOptions.ignore) ? overrideOptions.ignore : []

  return [
    severity,
    {
      ...baseOptions,
      ...overrideOptions,
      ignore: [...new Set([...baseIgnore, ...overrideIgnore])].sort(
        (a, b) => Number(a) - Number(b),
      ),
    },
  ] as OxlintRuleConfig
}

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
  /** Extra literals ignored by `no-magic-numbers`; `false` disables the rule. */
  noMagicNumbers?: false | { ignore?: number[] }
}

/**
 * Build an Oxlint configuration. Oxlint discovers `oxlint.config.ts`
 * automatically; pass `--config` only for a custom file name.
 */
/* eslint-disable sonarjs/cognitive-complexity -- config builder */
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
            ignore: [
              ...new Set([...DEFAULT_MAGIC_NUMBERS, ...(noMagicNumbers?.ignore ?? [])]),
            ].sort((a, b) => a - b),
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
      ...(extraRules?.['no-magic-numbers'] &&
        noMagicNumbers !== false && {
          'no-magic-numbers': mergeNoMagicNumbers(
            noMagicNumbersRule,
            extraRules['no-magic-numbers'],
          ) as NoMagicNumbersRule,
        }),
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
