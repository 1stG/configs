import type { OxfmtConfig } from 'oxfmt'

export type OxfmtConfigOptions = OxfmtConfig

/**
 * Build an Oxfmt configuration. Oxfmt discovers `oxfmt.config.ts`
 * automatically; pass `--config` only for a custom file name.
 */
export const defineConfig = (
  options: OxfmtConfigOptions = {},
): OxfmtConfig => ({
  arrowParens: 'avoid',
  printWidth: 80,
  semi: false,
  singleAttributePerLine: true,
  singleQuote: true,
  sortImports: true,
  sortPackageJson: false,
  trailingComma: 'all',
  ...options,
})

export default defineConfig()
