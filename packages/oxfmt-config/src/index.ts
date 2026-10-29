import type { OxfmtConfig } from 'oxfmt'

export type OxfmtConfigOptions = OxfmtConfig

const defaultOverrides: NonNullable<OxfmtConfig['overrides']> = [
  {
    files: ['.changeset/*.md'],
    options: {
      singleQuote: false,
    },
  },
]

/**
 * Build an Oxfmt configuration. Oxfmt discovers `oxfmt.config.ts` automatically; pass `--config`
 * only for a custom file name.
 */
export const defineConfig = ({
  overrides = [],
  ...options
}: OxfmtConfigOptions = {}): OxfmtConfig => ({
  arrowParens: 'avoid',
  semi: false,
  singleAttributePerLine: true,
  jsdoc: true,
  singleQuote: true,
  sortImports: true,
  sortPackageJson: false,
  trailingComma: 'all',
  ...options,
  overrides: [...defaultOverrides, ...overrides],
})

export default defineConfig()
