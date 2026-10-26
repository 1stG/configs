import { defineConfig as defineEslint } from '@1stg/eslint-config'

describe('@1stg/eslint-config', () => {
  it('builds a flat config with the oxlint disable list', () => {
    const config = defineEslint()
    expect(Array.isArray(config)).toBe(true)
    expect(config.some(item => item.name === 'oxlint/all')).toBe(true)
  })

  it('can disable the file-type presets', () => {
    const full = defineEslint()
    const minimal = defineEslint({
      jsonc: false,
      markdown: false,
      toml: false,
      yaml: false,
    })
    expect(minimal.length).toBeLessThan(full.length)
  })

  it('accepts extra ignores', () => {
    const ignores = defineEslint({ ignores: ['**/fixtures/**'] }).find(
      item => item.ignores,
    )
    expect(ignores?.ignores).toContain('**/fixtures/**')
  })
})
