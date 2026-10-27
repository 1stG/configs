import { defineConfig as defineEslint } from '@1stg/eslint-config'

describe('@1stg/eslint-config', () => {
  it('builds a flat config with the oxlint disable list', async () => {
    const config = await defineEslint({ code: false })
    expect(Array.isArray(config)).toBe(true)
    expect(config.some(item => item.name === 'oxlint/all')).toBe(true)
    expect(config.find(item => item.ignores)?.ignores).toContain(
      '**/*.{cjs,cts,js,jsx,mjs,mts,ts,tsx}',
    )
    expect((await defineEslint({ code: true })).find(item => item.ignores)?.ignores).not.toContain(
      '**/*.{cjs,cts,js,jsx,mjs,mts,ts,tsx}',
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
    const ignores = (await defineEslint({ ignores: ['**/fixtures/**'] })).find(item => item.ignores)
    expect(ignores?.ignores).toContain('**/fixtures/**')
  })
})

describe('@1stg/eslint-config markup', () => {
  it('only ignores HTML when markup is disabled', async () => {
    const config = await defineEslint({ markup: false })
    expect(config.find(item => item.ignores)?.ignores).toContain('**/*.html')
  })

  it('enables eslint-plugin-markup on Node 24', async () => {
    if (Number(process.versions.node.split('.')[0]) < 24) {
      // eslint-disable-next-line sonarjs/explicit-test-skip -- Node < 24
      return
    }

    const config = await defineEslint({ markup: true })
    expect(config.some(item => item.name === 'markup/flat-recommended')).toBe(true)
    expect(config.find(item => item.ignores)?.ignores).not.toContain('**/*.html')
  })
})

describe('@1stg/eslint-config code mode', () => {
  it('scopes the code configs to JS/TS files', async () => {
    const config = await defineEslint({ code: true })
    const codeFiles = '**/*.{cjs,cts,js,jsx,mjs,mts,ts,tsx}'
    expect(config.some(item => item.files?.includes(codeFiles))).toBe(true)
    expect(config.some(item => item.name === 'oxlint/all')).toBe(true)
  })
})
