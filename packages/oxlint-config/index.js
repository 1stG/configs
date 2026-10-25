// @ts-check

/**
 * @typedef {object} OxlintConfigOptions
 * @property {('correctness' | 'suspicious' | 'pedantic' | 'perf' | 'style' | 'restriction' | 'nursery')[]} [categories] Enabled categories.
 * @property {boolean} [jest=false] Enable Jest globals and rules.
 * @property {boolean} [jsdoc=true] Enable the JSDoc plugin.
 * @property {boolean} [node=true] Enable Node.js globals and rules.
 * @property {boolean} [promise=true] Enable the Promise plugin.
 * @property {boolean} [react=false] Enable React and JSX accessibility rules.
 * @property {boolean} [vitest=false] Enable Vitest globals and rules.
 * @property {boolean} [vue=false] Enable Vue rules.
 * @property {string[]} [ignores] Extra ignore patterns.
 */

/**
 * Build an Oxlint configuration. Oxlint reads it from `.oxlintrc.json` or a
 * JavaScript config passed with `--config`.
 *
 * @param {OxlintConfigOptions} [options]
 * @returns {Record<string, unknown>}
 */
export const createConfig = ({
  categories = ['correctness'],
  jest = false,
  jsdoc = true,
  node = true,
  promise = true,
  react = false,
  vitest = false,
  vue = false,
  ignores = [],
} = {}) => ({
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
