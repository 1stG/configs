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
  /** Ignore these gitignore-style patterns. */
  ignorePatterns?: string[]
  /** File-specific overrides. */
  overrides?: object[]
}

/**
 * Build an Oxfmt configuration. Oxfmt discovers `oxfmt.config.ts`
 * automatically; pass `--config` only for a custom file name.
 */
export const defineConfig = ({
  printWidth = 80,
  semi = false,
  singleQuote = true,
  sortImports = true,
  sortPackageJson = false,
  jsdoc = false,
  ignorePatterns = [],
  overrides = [],
}: OxfmtConfigOptions = {}): Record<string, unknown> => ({
  arrowParens: 'avoid',
  printWidth,
  semi,
  singleAttributePerLine: true,
  singleQuote,
  sortImports,
  sortPackageJson,
  trailingComma: 'all',
  ...(jsdoc && { jsdoc }),
  ...(ignorePatterns.length > 0 && { ignorePatterns }),
  ...(overrides.length > 0 && { overrides }),
})

export default defineConfig()
