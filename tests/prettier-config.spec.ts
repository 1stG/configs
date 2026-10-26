import prettierConfig, {
  defineConfig as definePrettier,
} from '@1stg/prettier-config'

describe('@1stg/prettier-config', () => {
  it('uses the shared defaults', () => {
    expect(prettierConfig).toMatchObject({
      arrowParens: 'avoid',
      semi: false,
      singleQuote: true,
      trailingComma: 'all',
    })
  })

  it('resolves only the installed optional plugins', () => {
    expect(prettierConfig.plugins?.length).toBeGreaterThan(0)
    expect(
      prettierConfig.plugins?.every(
        plugin => typeof plugin === 'string' && plugin.startsWith('/'),
      ),
    ).toBe(true)
  })

  it('accepts native Prettier options', () => {
    expect(definePrettier({ printWidth: 120 }).printWidth).toBe(120)
  })

  it('lets the caller disable the plugins', () => {
    expect(definePrettier({ plugins: [] }).plugins).toEqual([])
  })

  it('adds the Vue HTML parser', () => {
    expect(definePrettier({ framework: 'vue' }).overrides).toContainEqual({
      files: '*.html',
      options: { parser: 'vue' },
    })
  })
})
