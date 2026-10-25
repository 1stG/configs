export interface OxlintConfigOptions {
  /** Enabled categories. @default ['correctness'] */
  categories?: Array<
    | 'correctness'
    | 'suspicious'
    | 'pedantic'
    | 'perf'
    | 'style'
    | 'restriction'
    | 'nursery'
  >
  /** Enable Jest globals and rules. @default false */
  jest?: boolean
  /** Enable the JSDoc plugin. @default true */
  jsdoc?: boolean
  /** Enable Node.js globals and rules. @default true */
  node?: boolean
  /** Enable React and JSX accessibility rules. @default false */
  react?: boolean
  /** Enable Vitest globals and rules. @default false */
  vitest?: boolean
  /** Enable Vue rules. @default false */
  vue?: boolean
  /** Extra ignore patterns. */
  ignores?: string[]
}

export declare const createConfig: (
  options?: OxlintConfigOptions,
) => Record<string, unknown>

declare const config: Record<string, unknown>

export default config
