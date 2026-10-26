import { defineConfig as defineEslint } from '@1stg/eslint-config'

describe('@1stg/eslint-config', () => {
  it('builds a flat config with the oxlint disable list', async () => {
    const config = await defineEslint()
    expect(Array.isArray(config)).toBe(true)
    expect(config.some(item => item.name === 'oxlint/all')).toBe(true)
    expect(config.find(item => item.ignores)?.ignores).toContain(
      '**/*.{cjs,cts,js,jsx,mjs,mts,ts,tsx,vue}',
    )
  })

  it('can disable the file-type presets', async () => {
    const full = await defineEslint()
    const minimal = await defineEslint({
      jsonc: false,
      markdown: false,
      toml: false,
      yaml: false,
    })
    expect(minimal.length).toBeLessThan(full.length)
  })

  it('accepts extra ignores', async () => {
    const ignores = (await defineEslint({ ignores: ['**/fixtures/**'] })).find(
      item => item.ignores,
    )
    expect(ignores?.ignores).toContain('**/fixtures/**')
  })
})
