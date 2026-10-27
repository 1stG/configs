import { defineConfig as defineOxfmt } from '@1stg/oxfmt-config'

const WIDE_PRINT_WIDTH = 120

describe('@1stg/oxfmt-config', () => {
  it('keeps Prettier-compatible defaults', () => {
    const config = defineOxfmt()
    expect(config.semi).toBe(false)
    expect(config.sortImports).toBe(true)
    expect(config.sortPackageJson).toBe(false)
  })

  it('accepts overrides', () => {
    expect(defineOxfmt({ printWidth: WIDE_PRINT_WIDTH }).printWidth).toBe(WIDE_PRINT_WIDTH)
    expect(defineOxfmt({ ignorePatterns: ['package.json'] }).ignorePatterns).toEqual([
      'package.json',
    ])
  })
})
