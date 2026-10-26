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

  it('resolves plugin entry points without importing them', () => {
    expect(prettierConfig.plugins).toHaveLength(12)
    expect(
      prettierConfig.plugins?.every(
        plugin => typeof plugin === 'string' && plugin.startsWith('/'),
      ),
    ).toBe(true)
  })

  it('adds the Vue HTML parser', () => {
    expect(definePrettier({ framework: 'vue' }).overrides).toContainEqual({
      files: '*.html',
      options: { parser: 'vue' },
    })
  })
})
