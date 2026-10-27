import prettierConfig, {
  defineConfig as definePrettier,
} from '@1stg/prettier-config'

const DEFAULT_PRINT_WIDTH = 100
const WIDE_PRINT_WIDTH = 120

describe('@1stg/prettier-config', () => {
  it('uses the shared defaults', () => {
    expect(prettierConfig).toMatchObject({
      arrowParens: 'avoid',
      printWidth: DEFAULT_PRINT_WIDTH,
      semi: false,
      singleQuote: true,
      trailingComma: 'all',
    })
  })

  it('resolves only the installed optional plugins', () => {
    expect(prettierConfig.plugins?.length).toBeGreaterThan(0)
    expect(
      prettierConfig.plugins?.some(
        plugin =>
          typeof plugin === 'string' && plugin.includes('prettier-plugin-pkg'),
      ),
    ).toBe(true)
    expect(
      prettierConfig.plugins?.every(
        plugin => typeof plugin === 'string' && plugin.startsWith('/'),
      ),
    ).toBe(true)
  })

  it('accepts native Prettier options', () => {
    expect(definePrettier({ printWidth: WIDE_PRINT_WIDTH }).printWidth).toBe(
      WIDE_PRINT_WIDTH,
    )
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
