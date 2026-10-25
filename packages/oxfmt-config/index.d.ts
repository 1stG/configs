export interface OxfmtConfigOptions {
  /** Line width. @default 80 */
  printWidth?: number
  /** Print semicolons. @default false */
  semi?: boolean
  /** Use single quotes. @default true */
  singleQuote?: boolean
  /** Sort imports with Oxfmt's built-in sorter. @default true */
  sortImports?: boolean
  /** Sort `package.json` keys. @default true */
  sortPackageJson?: boolean
  /** Format JSDoc comments. @default false */
  jsdoc?: boolean | object
  /** File-specific overrides. */
  overrides?: object[]
}

export declare const createConfig: (
  options?: OxfmtConfigOptions,
) => Record<string, unknown>

declare const config: Record<string, unknown>

export default config
