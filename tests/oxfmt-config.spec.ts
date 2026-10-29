import { defineConfig as defineOxfmt } from '@1stg/oxfmt-config'

const WIDE_PRINT_WIDTH = 120

describe('@1stg/oxfmt-config', () => {
  it('keeps Prettier-compatible defaults', () => {
    const config = defineOxfmt()
    expect(config.semi).toBe(false)
    expect(config.sortImports).toBe(true)
    expect(config.sortPackageJson).toBe(false)
    expect(config.overrides).toEqual([
      {
        files: ['.changeset/*.md'],
        options: { singleQuote: false },
      },
    ])
  })

  it('accepts overrides', () => {
    expect(defineOxfmt({ printWidth: WIDE_PRINT_WIDTH }).printWidth).toBe(WIDE_PRINT_WIDTH)
    expect(defineOxfmt({ ignorePatterns: ['package.json'] }).ignorePatterns).toEqual([
      'package.json',
    ])
    expect(
      defineOxfmt({
        overrides: [{ files: ['*.js'], options: { semi: true } }],
      }).overrides,
    ).toHaveLength(2)
  })
})
