import { defineConfig as defineOxfmt } from '@1stg/oxfmt-config'

describe('@1stg/oxfmt-config', () => {
  it('keeps Prettier-compatible defaults', () => {
    const config = defineOxfmt()
    expect(config.printWidth).toBe(80)
    expect(config.semi).toBe(false)
    expect(config.sortImports).toBe(true)
    expect(config.sortPackageJson).toBe(false)
  })

  it('accepts overrides', () => {
    expect(defineOxfmt({ printWidth: 120 }).printWidth).toBe(120)
    expect(
      defineOxfmt({ ignorePatterns: ['package.json'] }).ignorePatterns,
    ).toEqual(['package.json'])
  })
})
